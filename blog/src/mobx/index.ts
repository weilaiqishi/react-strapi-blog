import { observable } from 'mobx'

import * as api from '@/api'

import { articleInfoStore } from './articleInfoStore'
import { uiStore } from './uiStore'
export * from './uiStore'
import * as utils from '../utils/utils'

let store = {
    uiStore,
    articleInfoStore,

    apiArticle: {
        getArticleInfo: utils.asyncThrottle(async () => {
            const res = await api.strapiArticleInfo()
            console.log('>>> getArticleInfo -> ', res)
            store.articleInfoStore = res.data
        })
    }
}

store = observable(store)
export const rootStore = store