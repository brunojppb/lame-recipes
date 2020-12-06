import { gql } from 'apollo-server-express';

const Root = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query
  type Mutation
`;

export default Root;
