const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');

const { getUserFromSession, AUTH_HEADER } = require('./auth');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.cookies[AUTH_HEADER];
    if (token) {
      const user = await getUserFromSession(token);
      req.user = user;
    }
    return { req };
  },
});

module.exports = {
  apolloServer,
};
