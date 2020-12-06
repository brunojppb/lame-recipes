const Recipe = require('../models/recipe.js');

function findRecipe(id) {
  return Recipe.findByPk(id);
}

async function createRecipe(name) {
  return Recipe.create({ name });
}

async function getAllRecipes() {
  return Recipe.findAll({});
}

const RecipesRepo = {
  findRecipe,
  createRecipe,
  getAllRecipes,
};

module.exports = {
  RecipesRepo,
};
