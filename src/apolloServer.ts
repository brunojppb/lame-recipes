import app from './app';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

export const apolloServer = new ApolloServer({ typeDefs, resolvers });
