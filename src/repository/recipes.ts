import { Recipe } from '../models/recipe';
import { getConnection } from 'typeorm';

function findRecipe(id: number): Promise<Recipe> {
  const conn = getConnection();
  const repo = conn.getRepository(Recipe);
  return repo.findOneOrFail(id);
}

function createRecipe(name: string): Promise<Recipe> {
  // Since I'm using SQLite here, it does't enforce varchar size
  // it considers VARCHAR columns same as TEXT and doesn't validate the length
  if (name.length > 255) {
    return Promise.reject(new Error('Name too long. must be < 255 characters'));
  }
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
