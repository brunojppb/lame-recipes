import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export default apolloServer;
