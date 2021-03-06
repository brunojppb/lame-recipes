const { mergeResolvers } = require('@graphql-tools/merge');
const recipeResolvers = require('./recipes.resolvers');
const userResolvers = require('./users.resolvers');
const authResolvers = require('./auth.resolvers');
const fileUploadResolvers = require('./fileUpload.resolvers');

const resolvers = mergeResolvers([
  recipeResolvers,
  userResolvers,
  authResolvers,
  fileUploadResolvers
]);

module.exports = resolvers;
