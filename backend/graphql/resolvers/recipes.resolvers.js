const { RecipesRepo } = require('../../repository/recipes.js');

/** Queries */
async function getRecipe(root, { id }, {user}) {
  return RecipesRepo.findRecipe(id, user.id);
}

async function getAllRecipes(root, args, {user}) {
  return RecipesRepo.getAllRecipes(user.id);
}

async function getMyRecipes(root, args, {user}) {
  return RecipesRepo.getUserRecipes(user.id)
}

/** Mutations */
async function createRecipe(root, { name, content }, {user}) {
  return RecipesRepo.createRecipe(name, content, user.id);
}

const resolvers = {
  Query: {
    getRecipe,
    getAllRecipes,
    getMyRecipes
  },
  Mutation: {
    createRecipe,
  },
};

module.exports = resolvers;
