import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery
} from "@apollo/client"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { rootStore } from '@/mobx'

import { graphqlClient } from './api'
import App from './App'


if (module?.hot) {
  module.hot.accept()
}
ReactDOM.render(
  <HashRouter>
    <ApolloProvider client={graphqlClient}>
      <App />
    </ApolloProvider>
  </HashRouter>,
  document.getElementById('root')
);

rootStore.apiArticle.getArticleInfo()
