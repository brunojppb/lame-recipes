const Recipe = require('../models/recipe');
const File = require('../models/file');

async function findRecipe(id, userId) {
  const recipe = await Recipe.findOne({where: {id, userId}, include: 'files'});
  console.log('recipe found: ', {recipe})
  return recipe
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
