import app from './app';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const port: string = app.get('port');

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`🚀 Server running on port ${port}`);
});
