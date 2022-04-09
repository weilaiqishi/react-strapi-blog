import lodash from 'lodash-es'
import qs from 'qs'

import request from '../request'
import { typePagination, typeStrapiEntity,typeStrapiFind, typeStrapiFindOne } from './type'

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
export type typeArticleItem = typeStrapiEntityArticle & {
    attributes: {
        category: string,
        tags: string[]
    }
}
export const strapiArticleList = async (
    { page, pageSize, categoryName, tagName }:
        Partial<{ categoryName: string, tagName: string } & typePagination>
): Promise<typeStrapiFind<typeArticleItem>> => {
    const queryOption = {
        populate: '*',
        filters: {
            category: {
                categoryName: {} as any
            },
            tags: {
                tagName: {} as any
            }
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
    return {
        data,
        meta: res.meta
    }
}