const { RecipesRepo } = require('../../repository/recipes.js');

/** Queries */
const getRecipe = async (root, { id }, ctx) => {
  console.log('getting Recipe');
  return RecipesRepo.findRecipe(id);
};

const getAllRecipes = async (root, args, ctx) => {
  console.log('get all recipes');
  return RecipesRepo.getAllRecipes();
};

/** Mutations */
const createRecipe = async (root, { name }, ctx) => {
  console.log('creating recipe');
  return RecipesRepo.createRecipe(name);
};

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
