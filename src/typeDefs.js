import { gql } from 'apollo-server-express';

// Type definitions for GraphQL go here
export const typeDefs = gql`
  type Query {
    hello: World!
  }

  type World {
    world: String!
  }
`;
