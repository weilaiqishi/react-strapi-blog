import lodash from 'lodash-es'
import qs from 'qs'

import request from '../request'
import { strapiArticleList } from './article'
import { typePagination, typeStrapiEntity, typeStrapiFind, typeStrapiFindOne, typeStrapiRESTFiltering } from './type'

export type typeStrapiEntityCommentAttr = {
    nickName: string,
    avatar: string,
    email: string,
    content: string,
    article: any,
    replyId: number | null
}

export type typeStrapiEntityComment = typeStrapiEntity<typeStrapiEntityCommentAttr>

export const strapiCommentList = async (
    { page, pageSize, titleEng, replyIds }:
        Partial<{ titleEng: string, replyIds: number[] } & typePagination>
): Promise<typeStrapiFind<typeStrapiEntityComment>> => {
    const filterArticleTitleEng: typeStrapiRESTFiltering = {}
    const filterReplyId: typeStrapiRESTFiltering = {
        $null: true
    }
    const queryOption = {
        populate: '*',
        filters: {
            article: { titleEng: filterArticleTitleEng },
            replyId: filterReplyId
        },
        pagination: {
            page: page || 1,
            pageSize: pageSize || 10
        },
        sort: ['createdAt:desc']
    }
    if (titleEng) {
        queryOption.filters.article.titleEng = { $eq: titleEng }
    }
    if (replyIds) {
        queryOption.filters.replyId = { $in: replyIds }
    }
    const query = qs.stringify(queryOption, {
        encodeValuesOnly: true
    })
    const res = await request<typeStrapiFind<typeStrapiEntityComment>>({
        url: `/api/comments?${query}`
    })
    return res
}

const articleIdMap = new Map()
export const strapiCommentPost = async (form: Omit<typeStrapiEntityCommentAttr, 'article'> & { titleEng: string }): Promise<any> => {
    console.log('strapiCommentPost')
    let id = articleIdMap.get(form.titleEng)
    console.log(id)
    if (!id) {
        const { data: [article] } = await strapiArticleList({ titleEng: form.titleEng, pageSize: 1 })
        if (!article) {
            throw '文章不存在'
        }
        id = article.id
        articleIdMap.set(form.titleEng, id)
    }
    const res = await request<any>({
        url: `/api/comments`,
        method: 'POST',
        data: {
            data: {
                ...form,
                article: { id }
            }
        }
    })
    return res
}