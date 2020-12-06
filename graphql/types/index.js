const { gql } = require('apollo-server-express');
const Recipe = require('./recipe');

const Root = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query
  type Mutation
`;

const typeDefs = [Root, Recipe];

module.exports = typeDefs;
