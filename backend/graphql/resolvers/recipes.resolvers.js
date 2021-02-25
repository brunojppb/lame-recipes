const { UserInputError } = require('apollo-server')
const { RecipesRepo } = require('../../repository/recipes.js')
const marked = require('marked')
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

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
  const html = marked(content)
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  const sanitizedHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: {
      html: true
    } 
  });
  return RecipesRepo.createRecipe(name, content, sanitizedHtml, coverId, user.id);
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
