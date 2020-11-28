import { Recipe } from '../models/recipe';
import { getConnection } from 'typeorm';

function findRecipe(id: number): Promise<Recipe> {
  const conn = getConnection();
  const repo = conn.getRepository(Recipe);
  return repo.findOneOrFail(id);
}

function createRecipe(name: string): Promise<Recipe> {
  const conn = getConnection();
  const repo = conn.getRepository(Recipe);
  const newRecipe = new Recipe();
  newRecipe.name = name;
  newRecipe.id = undefined;
  return repo.save(newRecipe);
}

function getAllRecipes(): Promise<Array<Recipe>> {
  const conn = getConnection();
  const repo = conn.getRepository(Recipe);
  return repo.find();
}

const RecipesRepo = {
  findRecipe,
  createRecipe,
  getAllRecipes
};

export default RecipesRepo;
