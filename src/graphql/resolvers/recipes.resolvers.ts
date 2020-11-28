import { Recipe } from '../../models/recipe';
import RecipesRepo from '../../repository/recipes';

type RecipeInput = {
  name: string;
};

async function getRecipe(root: any, args: { id: number }, ctx: any): Promise<Recipe> {
  return RecipesRepo.findRecipe(args.id);
}

async function createRecipe(root: any, args: RecipeInput, ctx: any): Promise<Recipe> {
  return RecipesRepo.createRecipe(args.name);
}

async function getAllRecipes(root: any, args: any, ctx: any): Promise<Array<Recipe>> {
  return RecipesRepo.getAllRecipes();
}

export const Query = {
  getRecipe,
  getAllRecipes
};

export const Mutation = {
  createRecipe
};
