// https://www.apollographql.com/docs/react/get-started

import {
    ApolloClient,
    InMemoryCache
} from "@apollo/client";

import { baseURL } from '../baseUrl'

export const graphqlClient = new ApolloClient({
    uri: `${baseURL}/graphql`,
    cache: new InMemoryCache()
});
