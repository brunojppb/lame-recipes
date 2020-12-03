import RecipesRepo from '../../repository/recipes';

/** Queries */
async function getRecipe(root, {id}, ctx) {
  return RecipesRepo.findRecipe(id);
}

async function getAllRecipes(root, args, ctx) {
  return RecipesRepo.getAllRecipes();
}

/** Mutations */
async function createRecipe(root, {name}, ctx) {
  return RecipesRepo.createRecipe(args.name);
}

export const Query = {
  getRecipe,
  getAllRecipes
};

export const Mutation = {
  createRecipe
};
