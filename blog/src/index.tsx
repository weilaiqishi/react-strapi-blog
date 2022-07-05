import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery
} from "@apollo/client"
import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { rootStore } from '@/mobx'

import { graphqlClient } from './api'
import App from './App'


if (module?.hot) {
  module.hot.accept()
}
createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <ApolloProvider client={graphqlClient}>
      <App />
    </ApolloProvider>
  </HashRouter>
)

rootStore.apiArticle.getArticleInfo()
