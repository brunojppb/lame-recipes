const { RecipesRepo } = require('../../repository/recipes.js');

/** Queries */
async function getRecipe(root, { id }, {user}) {
  return RecipesRepo.findRecipe(id, user.id);
}

async function getMyRecipes(root, args, {user}) {
  return RecipesRepo.getUserRecipes(user.id)
}

/** Mutations */
async function createRecipe(root, args, {user}) {
  const { name, content, coverId } = args.input;
  return RecipesRepo.createRecipe(name, content, coverId, user.id);
}

const resolvers = {
  Query: {
    getRecipe,
    getMyRecipes
  },
  Mutation: {
    createRecipe,
  },
};

module.exports = resolvers;
