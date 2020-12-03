import { Recipe } from '../models/recipe';

function findRecipe(id) {
  // TODO: Find recipe by ID
  return {
    id: '12345',
    name: 'mock'
  }
}

function createRecipe(name) {
  // Since I'm using SQLite here, it does't enforce varchar size
  // it considers VARCHAR columns same as TEXT and doesn't validate the length
  if (name.length > 255) {
    return Promise.reject(new Error('Name too long. must be < 255 characters'));
  }
  // TODO: save recipe
  return {
    id: '12345',
    name: 'mock'
  }
}

function getAllRecipes() {
  // TODO: list all recipes
  return [
    {
      id: '12345',
      name: 'mock'
    }
  ]
}

const RecipesRepo = {
  findRecipe,
  createRecipe,
  getAllRecipes
};

export default RecipesRepo;
