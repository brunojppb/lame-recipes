const { RecipesRepo } = require('../../repository/recipes.js');

/** Queries */
async function getRecipe(root, { id }, ctx) {
  return RecipesRepo.findRecipe(id);
}

async function getAllRecipes(root, args, ctx) {
  return RecipesRepo.getAllRecipes();
}

/** Mutations */
async function createRecipe(root, { name }, ctx) {
  return RecipesRepo.createRecipe(name);
}

const resolvers = {
  Query: {
    getRecipe,
    getAllRecipes,
  },
  Mutation: {
    createRecipe,
  },
};

module.exports = resolvers;
