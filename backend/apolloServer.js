const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = {
  apolloServer,
};
