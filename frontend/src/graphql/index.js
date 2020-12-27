import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const apolloClient = new ApolloClient({
  uri: '/graphql',
  link: createUploadLink({uri: '/graphql'}),
  cache: new InMemoryCache()
})