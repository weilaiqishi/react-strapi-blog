import { gql } from "@apollo/client"

import { graphqlClient } from './graphql'
import { typePagination, typeStrapiEntity, typeStrapiFind, typeStrapiFindOne } from './type'

export const articleInfoQuery = gql`
query {
  articles {
    meta {
      pagination {
        total
      }
    }
  }
  categories (pagination: { page: 1, pageSize: 500 }) {
    data {
      id
      attributes {
        categoryName
        articles {
          data {
            id
          }
        }
      }
    }
    meta {
      pagination {
        total
      }
    }
  }
  tags (pagination: { page: 1, pageSize: 500 }) {
    data {
      id
      attributes {
        tagName
      }
    }
    meta {
      pagination {
        total
      }
    }
  }
}
`

type strapiTotal = {
  meta: {
    pagination: {
      total: number
    }
  }
}

type typeStrapiEntityCategory = typeStrapiEntity<{
  categoryName: string
  articles: { data: any[] }
}>
type typeStrapiEntityTag = typeStrapiEntity<{
  tagName: string
}>

export type typeArticleInfo = {
  articles: strapiTotal,
  categories: {
    data: typeStrapiEntityCategory[]
  } & strapiTotal,
  tags: {
    data: typeStrapiEntityTag[]
  } & strapiTotal,
}

export const strapiArticleInfo = () => {
  return graphqlClient
    .query<typeArticleInfo>({
      query: articleInfoQuery
    })
}