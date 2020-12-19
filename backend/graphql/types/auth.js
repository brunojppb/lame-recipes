const { gql } = require('apollo-server-express');

const Auth = gql`
  input SignupInput {
    name: String!
    email: String!
    password: String!
    passwordConfirmation: String!
  }

  input SigninInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    signup(input: SignupInput): User
    signin(input: SigninInput): User
  }
`;

module.exports = Auth;
