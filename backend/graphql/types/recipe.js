const { gql } = require('apollo-server-express');

const Recipe = gql`
  type Recipe {
    id: ID!
    name: String!
  }

  input NewRecipe {
    name: String!
  }

  extend type Query {
    getRecipe(id: ID!): Recipe! @isAuthenticated
    getAllRecipes: [Recipe]!
    getMyRecipes: [Recipe]! @isAuthenticated
  }

  extend type Mutation {
    createRecipe(name: String): Recipe!
  }
`;

module.exports = Recipe;
