import lodash from 'lodash-es'
import qs from 'qs'

import request from './request'

export type typeStrapiGET<T> = {
    data: T[],
    meta: {
        pagination: {
            page: number,
            pageCount: number,
            pageSize: number,
            total: number
        }
    }
}

export type ArticleItemRaw = {
    attributes: {
        content: string,
        createdAt: string,
        publishedAt: string,
        title: string,
        titleEng: string,
        updatedAt: string,
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
    }
    id: number
}

type ArticleItem = ArticleItemRaw & {
    attributes: {
        category: string,
        tags: string[]
    }
}

export const strapiGETArticleList = async (): Promise<typeStrapiGET<ArticleItem>> => {
    const res = await request<typeStrapiGET<ArticleItemRaw>>({
        url: `/api/articles?${qs.stringify({ populate: '*' })}`
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