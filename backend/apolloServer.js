const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');

const { IsAuthenticatedDirective } = require('./graphql/directives/IsAuthenticatedDirective')
const { getUserFromSession, AUTH_HEADER } = require('./auth');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
  },
  context: async ({ req }) => {
    const context = { request: req }
    const token = req.cookies[AUTH_HEADER];
    if (token) {
      const user = await getUserFromSession(token);
      context.user = user;
    }
    return context;
  },
  formatError: (err) => {
    if (!err.message) {
      err.message = 'oops. Something went wrong. Try again later.';
      console.error("Error without message patched: ", err);
    }
    return err;
  }
});

module.exports = {
  apolloServer,
};
