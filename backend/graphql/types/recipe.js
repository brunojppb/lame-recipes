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
    getRecipe(id: ID!): Recipe!
    getAllRecipes: [Recipe]!
  }

  extend type Mutation {
    createRecipe(name: String): Recipe!
  }
`;

module.exports = Recipe;