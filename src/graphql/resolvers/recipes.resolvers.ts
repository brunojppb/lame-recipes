import { Recipe } from '../../models/recipe';
import RecipesRepo from '../../repository/recipes';

type RecipeInput = {
  name: string;
};

/** Queries */
async function getRecipe(root: any, args: { id: number }, ctx: any): Promise<Recipe> {
  return RecipesRepo.findRecipe(args.id);
}

async function getAllRecipes(root: any, args: any, ctx: any): Promise<Array<Recipe>> {
  return RecipesRepo.getAllRecipes();
}

/** Mutations */
async function createRecipe(root: any, args: RecipeInput, ctx: any): Promise<Recipe> {
  return RecipesRepo.createRecipe(args.name);
}

export const Query = {
  getRecipe,
  getAllRecipes
};

export const Mutation = {
  createRecipe
};
