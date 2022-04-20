import lodash from 'lodash-es'
import qs from 'qs'

import request from '../request'
import { typePagination, typeStrapiEntity, typeStrapiFind, typeStrapiFindOne, typeStrapiRESTFiltering } from './type'

export type typeStrapiEntityComment = typeStrapiEntity<{
    nickName: string,
    avatar: string,
    email: string,
    content: string,
    article: any,
    replyId: number | null
}>

export const strapiCommentList = async (
    { page, pageSize, titleEng, replyId }:
        Partial<{ titleEng: string, replyId: number } & typePagination>
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
    if (replyId) {
        queryOption.filters.replyId = { $eq: replyId }
    }
    const query = qs.stringify(queryOption, {
        encodeValuesOnly: true
    })
    const res = await request<typeStrapiFind<typeStrapiEntityComment>>({
        url: `/api/comments?${query}`
    })
    return res
}