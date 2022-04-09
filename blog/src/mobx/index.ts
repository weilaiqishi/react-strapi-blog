import { observable } from 'mobx'

import { uiStore } from './uiStore'
export * from './uiStore'

let store = {
    uiStore
}

store = observable(store)
export const rootStore = store