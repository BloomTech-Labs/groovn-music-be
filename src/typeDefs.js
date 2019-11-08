import { gql } from 'apollo-server-express';

// Type definitions for GraphQL go here
export const typeDefs = gql`
  type Query {
    hello: World!
    getUsers: [User!]!
  }

  type World {
    world: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Mutation {
    createUser(username: String!, email: String!): User!
  }
`;
