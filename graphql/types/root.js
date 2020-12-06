const { gql } = require('apollo-server-express');

const Root = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query
  type Mutation
`;

module.exports = Root;
