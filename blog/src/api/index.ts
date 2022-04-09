import lodash from 'lodash-es'
import qs from 'qs'

import request from './request'

type typePagination = {
    page: number, pageSize: number
}

export type typeStrapiFind<T> = {
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

export type typeStrapiFindOne<T> = {
    data: T,
    meta: {}
}

export type typeStrapiEntity<T> = {
    attributes: T & {
        createdAt: string,
        updatedAt: string,
        publishedAt?: string,
    }
    id: number
}

// --- start Article
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
// --- end Article



// --- start Pageview
type typeStrapiEntityPageview = typeStrapiEntity<{
    num: number
}>
export const strapiPageviewCount = async (): Promise<number> => {
    const res = await request<typeStrapiFindOne<typeStrapiEntityPageview>>({
        url: `/api/pageview/count`,
        method: 'POST'
    })
    return res.data.attributes.num
}
// --- end Pageview



// --- start notice
type typeStrapiEntityNotice = typeStrapiEntity<{
    text: string
}>
export const strapiNoticeList = async (
    { page, pageSize }:
        Partial<typePagination>
): Promise<typeStrapiFind<typeStrapiEntityNotice>> => {
    const queryOption = {
        populate: '*',
        pagination: {
            page: page || 1,
            pageSize: pageSize || 10
        },
        sort: ['createdAt:desc']
    }
    const query = qs.stringify(queryOption, {
        encodeValuesOnly: true
    })
    const res = await request<typeStrapiFind<typeStrapiEntityNotice>>({
        url: `/api/notices?${query}`
    })
    return res
}
// --- end notice

