import { mergeResolvers } from '@graphql-tools/merge';

import recipeResolvers from './recipes.resolvers.js';

const resolvers = mergeResolvers([recipeResolvers]);

export default resolvers;
