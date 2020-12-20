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

async function getUserRecipes(userId) {
  return Recipe.findAll({where: {userId}})
}

const RecipesRepo = {
  findRecipe,
  createRecipe,
  getAllRecipes,
  getUserRecipes
};

module.exports = {
  RecipesRepo,
};
