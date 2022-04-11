import qs from 'qs'

import request from '../request'
import { typePagination, typeStrapiEntity, typeStrapiFieldSingleImg, typeStrapiFind, typeStrapiFindOne } from './type'

export type typeStrapiEntityGallery = typeStrapiEntity<{
    galleryName: string
    galleryDescription: string
    galleryCover: typeStrapiFieldSingleImg
}>
export const strapiGalleryList = async (
    { page, pageSize }:
        Partial<typePagination>
): Promise<typeStrapiFind<typeStrapiEntityGallery>> => {
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
    const res = await request<typeStrapiFind<typeStrapiEntityGallery>>({
        url: `/api/galleries?${query}`
    })
    return res
}

export type typeStrapiEntityImg = typeStrapiEntity<{
    src: typeStrapiFieldSingleImg
    gallery: typeStrapiEntityGallery
}>
export const strapiImgList = async (
    { page, pageSize, galleryName }:
        Partial<typePagination & { galleryName: string }>
): Promise<typeStrapiFind<typeStrapiEntityImg>> => {
    const queryOption = {
        populate: '*',
        pagination: {
            page: page || 1,
            pageSize: pageSize || 100
        },
        sort: ['createdAt:desc'],
        filters: {
            gallery: {
                galleryName: {} as any
            }
        }
    }
    if (galleryName) {
        queryOption.filters.gallery.galleryName = { $eq: galleryName }
    }
    const query = qs.stringify(queryOption, {
        encodeValuesOnly: true
    })
    const res = await request<typeStrapiFind<typeStrapiEntityImg>>({
        url: `/api/imgs?${query}`
    })
    return res
}