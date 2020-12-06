const Recipe = require('../models/recipe.js');

function findRecipe(id) {
  // TODO: Find recipe by ID
  return {
    id: '12345',
    name: 'mock',
  };
}

async function createRecipe(name) {
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
