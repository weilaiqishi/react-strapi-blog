import lodash from 'lodash-es'
import qs from 'qs'

import request from '../request'
import { typePagination, typeStrapiEntity, typeStrapiFind, typeStrapiFindOne } from './type'

type typeStrapiEntityTag = typeStrapiEntity<{
    tagName: string
}>
export const strapiTagList = async (
    { page, pageSize }:
        Partial<typePagination>
): Promise<typeStrapiFind<typeStrapiEntityTag>> => {
    const queryOption = {
        populate: '*',
        pagination: {
            page: page || 1,
            pageSize: pageSize || 100
        },
        sort: ['createdAt:desc']
    }
    const query = qs.stringify(queryOption, {
        encodeValuesOnly: true
    })
    const res = await request<typeStrapiFind<typeStrapiEntityTag>>({
        url: `/api/tags?${query}`
    })
    return res
}