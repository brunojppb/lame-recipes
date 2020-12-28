const Recipe = require('../models/recipe');
const File = require('../models/file');

async function findRecipe(id, userId) {
  return Recipe.findOne({
    where: {id, userId},
    include: {
      model: File,
      as: 'cover'
    }
  });
}

async function createRecipe(name, content, coverId, userId) {
  return Recipe.create({ name, content, coverId, userId });
}

async function getUserRecipes(userId) {
  return Recipe.findAll({
    where: {userId},
    include: {
      model: File,
      as: 'cover'
    }
  });
}

const RecipesRepo = {
  findRecipe,
  createRecipe,
  getUserRecipes
};

module.exports = {
  RecipesRepo,
};
