const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = {
  apolloServer,
};
