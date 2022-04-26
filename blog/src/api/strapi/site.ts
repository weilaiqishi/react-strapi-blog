import lodash from 'lodash-es'
import qs from 'qs'

import request from '../request'
import { typePagination, typeStrapiEntity, typeStrapiFind, typeStrapiFindOne } from './type'

type typeStrapiEntitySite = typeStrapiEntity<{
    siteName: string
    description: string
    avatar: string
    link: string
}>
export const strapiSiteList = async (
    { page, pageSize }:
        Partial<typePagination>
): Promise<typeStrapiFind<typeStrapiEntitySite>> => {
    const queryOption = {
        populate: '*',
        pagination: {
            page: page || 1,
            pageSize: pageSize || 1000
        },
        sort: ['createdAt:desc']
    }
    const query = qs.stringify(queryOption, {
        encodeValuesOnly: true
    })
    const res = await request<typeStrapiFind<typeStrapiEntitySite>>({
        url: `/api/sites?${query}`
    })
    return res
}