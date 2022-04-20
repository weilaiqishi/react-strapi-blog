import lodash from 'lodash-es'
import qs from 'qs'

import request from '../request'
import { typePagination, typeStrapiEntity, typeStrapiFind, typeStrapiFindOne } from './type'

export type typeStrapiEntityArticle = typeStrapiEntity<{
    content: string,
    title: string,
    titleEng: string,
    category: {
        data: {
            attributes: {
                categoryName: string
            }
        }
    },
    tags: {
        data: {
            attributes: {
                tagName: string
            }
        }[]
    }
}>
export type typeArticleItem = typeStrapiEntity<{
    content: string,
    title: string,
    titleEng: string,
    category: string,
    tags: string[]
}>
export const strapiArticleList = async (
    { page, pageSize, categoryName, tagName, title, titleEng }:
        Partial<{ categoryName: string, tagName: string, title: string, titleEng: string } & typePagination>
): Promise<typeStrapiFind<typeArticleItem>> => {
    const queryOption = {
        populate: '*',
        filters: {
            category: {
                categoryName: {} as any
            },
            tags: {
                tagName: {} as any
            },
            title: {},
            titleEng: {}
        },
        pagination: {
            page: page || 1,
            pageSize: pageSize || 10
        },
        sort: ['createdAt:desc']
    }
    if (categoryName) {
        queryOption.filters.category.categoryName = { $eq: categoryName }
    }
    if (tagName) {
        queryOption.filters.tags.tagName = { $in: [tagName] }
    }
    if (title) {
        queryOption.filters.title = { $containsi: title }
    }
    if (titleEng) {
        queryOption.filters.titleEng = { $eq: titleEng }
    }
    const query = qs.stringify(queryOption, {
        encodeValuesOnly: true
    })
    const res = await request<typeStrapiFind<typeStrapiEntityArticle>>({
        url: `/api/articles?${query}`
    })
    const data = res.data.map(item => {
        const category = item.attributes.category.data.attributes.categoryName
        const tags = item.attributes.tags.data.map(tagRaw => tagRaw.attributes.tagName)
        return lodash.merge(
            item,
            {
                attributes: {
                    category,
                    tags
                }

            }
        )
    })
    console.log('>>> strapiArticleList -> ', {
        data,
        meta: res.meta
    })
    return {
        data,
        meta: res.meta
    }
}