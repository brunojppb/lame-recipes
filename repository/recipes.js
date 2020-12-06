const Recipe = require('../models/recipe.js');

function findRecipe(id) {
  // TODO: Find recipe by ID
  return {
    id: '12345',
    name: 'mock',
  };
}

async function createRecipe(name) {
  // Since I'm using SQLite here, it does't enforce varchar size
  // it considers VARCHAR columns same as TEXT and doesn't validate the length
  if (name.length > 255) {
    return Promise.reject(new Error('Name too long. must be < 255 characters'));
  }
  return Recipe.create({ name });
}

async function getAllRecipes() {
  return Promise.resolve([
    {
      id: '12345',
      name: 'mock',
    },
  ]);
}

const RecipesRepo = {
  findRecipe,
  createRecipe,
  getAllRecipes,
};

module.exports = {
  RecipesRepo,
};
