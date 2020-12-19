const { gql } = require('apollo-server-express');

const User = gql`
  type User {
    name: String!
    email: String!
  }

  extend type Query {
    getMe: User!
  }
`;

module.exports = User;
