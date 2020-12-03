import app from './app.js';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

export const apolloServer = new ApolloServer({ typeDefs, resolvers });
