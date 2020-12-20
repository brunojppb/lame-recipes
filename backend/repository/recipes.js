const Recipe = require('../models/recipe.js');

function findRecipe(id, userId) {
  return Recipe.findOne({where: {id, userId}});
}

async function createRecipe(name, content, userId) {
  return Recipe.create({ name, content, userId });
}

async function getAllRecipes(userId) {
  return Recipe.findAll({where: {userId}});
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
