const { UserInputError } = require('apollo-server');
const { RecipesRepo } = require('../../repository/recipes.js');

/** Queries */
async function getRecipe(root, { id }, {user}) {
  return RecipesRepo.findRecipe(id, user.id);
}

async function getMyRecipes(root, args, {user}) {
  return RecipesRepo.getUserRecipes(user.id)
}

/** Mutations */
async function createRecipe(root, args, {user}) {
  const { name, content, coverId } = args.input;
  if (name.length < 2 || name.length > 255) {
    throw new UserInputError('Invalid recipe', {
      invalidArgs: {
        name: 'Name must be between 2 and 255 characters long.',
      }
    })
  }
  return RecipesRepo.createRecipe(name, content, coverId, user.id);
}

const resolvers = {
  Query: {
    getRecipe,
    getMyRecipes
  },
  Mutation: {
    createRecipe,
  },
};

module.exports = resolvers;
