import RecipesRepo from '../../repository/recipes.js';

/** Queries */
async function getRecipe(root, { id }, ctx) {
  return RecipesRepo.findRecipe(id);
}

async function getAllRecipes(root, args, ctx) {
  console.log('get all recipes');
  return RecipesRepo.getAllRecipes();
}

/** Mutations */
async function createRecipe(root, { name }, ctx) {
  return RecipesRepo.createRecipe(name);
}

export default {
  Query: {
    getRecipe,
    getAllRecipes,
  },
  Mutation: {
    createRecipe,
  },
};
