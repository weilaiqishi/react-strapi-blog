import lodash from 'lodash-es'
import qs from 'qs'

import request from '../request'
import { typePagination, typeStrapiEntity,typeStrapiFind, typeStrapiFindOne } from './type'

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