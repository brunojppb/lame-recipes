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
    signIn(input: SigninInput): User
    signUp(input: SignupInput): User
    signOut: Boolean
  }
`;

module.exports = Auth;
