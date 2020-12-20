const { RecipesRepo } = require('../../repository/recipes.js');

/** Queries */
async function getRecipe(root, { id }, ctx) {
  return RecipesRepo.findRecipe(id);
}

async function getAllRecipes(root, args, ctx) {
  return RecipesRepo.getAllRecipes();
}

async function getMyRecipes(root, args, {user}) {
  return RecipesRepo.getUserRecipes(user.id)
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
