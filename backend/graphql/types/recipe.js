const { gql } = require('apollo-server-express');

const Recipe = gql`
  type Recipe {
    id: ID!
    name: String!
    content: String!
  }

  input RecipeInput {
    name: String!
    content: String!
  }

  extend type Query {
    getRecipe(id: ID!): Recipe! @isAuthenticated
    getAllRecipes: [Recipe]! @isAuthenticated
    getMyRecipes: [Recipe]! @isAuthenticated
  }

  extend type Mutation {
    createRecipe(input: RecipeInput!): Recipe! @isAuthenticated
  }
`;

module.exports = Recipe;
