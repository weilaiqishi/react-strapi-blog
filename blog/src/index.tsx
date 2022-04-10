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
import { BrowserRouter } from 'react-router-dom'

import { rootStore } from '@/mobx'

import { graphqlClient } from './api'
import App from './App'


if (module?.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={graphqlClient}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

rootStore.apiArticle.getArticleInfo()
