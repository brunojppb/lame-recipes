const { mergeResolvers } = require('@graphql-tools/merge');
const recipeResolvers = require('./recipes.resolvers');

const resolvers = mergeResolvers([recipeResolvers]);

module.exports = resolvers;
