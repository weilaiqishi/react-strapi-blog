export type typePagination = {
    page: number, pageSize: number
}

type typeBaseData = string | number | boolean

export type typeStrapiRESTFiltering = Partial<{
    $eq: typeBaseData,
    $ne: typeBaseData,
    $lt: typeBaseData,
    $lte: typeBaseData,
    $gt: typeBaseData,
    $gte: typeBaseData,
    $in: Array<typeBaseData>,
    $notIn: Array<typeBaseData>,
    $contains: typeBaseData,
    $notContains: typeBaseData,
    $containsi: typeBaseData,
    $notContainsi: typeBaseData,
    $null: boolean,
    $notNull: boolean,
    $between: typeBaseData,
    $startsWith: string,
    $endsWith: string,
}>

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

export type typeStrapiFieldSingleImg = {
    data: {
        id: number,
        attributes: {
            url: string
        }
    }
}