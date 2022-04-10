import { typeArticleInfo } from '@/api'

export const articleInfoStore: typeArticleInfo = {
    articles: {
        meta: {
            pagination: {
                total: 0
            }
        }
    },
    categories: {
        data: [],
        meta: {
            pagination: {
                total: 0
            }
        }
    },
    tags: {
        data: [],
        meta: {
            pagination: {
                total: 0
            }
        }
    }
}