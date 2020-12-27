const { gql } = require('apollo-server-express');
const Recipe = require('./recipe');
const User = require('./user');
const Auth = require('./auth');
const FileUpload = require('./fileUpload')

const Root = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query
  type Mutation
  
  directive @isAuthenticated on FIELD_DEFINITION | FIELD
`;

const typeDefs = [Root, Recipe, User, Auth, FileUpload];

module.exports = typeDefs;
