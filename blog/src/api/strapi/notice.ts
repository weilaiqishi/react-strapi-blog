import lodash from 'lodash-es'
import qs from 'qs'

import request from '../request'
import { typePagination, typeStrapiEntity, typeStrapiFind, typeStrapiFindOne } from './type'

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