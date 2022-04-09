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

import store from '@/redux/store'

import { graphqlClient } from './api'
import App from './App'

if (module?.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={graphqlClient}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
