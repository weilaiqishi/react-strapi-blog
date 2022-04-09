import { gql } from "@apollo/client";

export const articleNumsQuery = gql`
query {
  articles {
    meta {
      pagination {
        total
      }
    }
  }
  categories {
    meta {
      pagination {
        total
      }
    }
  }
  tags {
    meta {
      pagination {
        total
      }
    }
  }
}
`;

type strapiTotal = {
  meta: {
    pagination: {
      total: number
    }
  }
}

export type typeArticleNums = {
  articles: strapiTotal,
  categories: strapiTotal,
  tags: strapiTotal,
}