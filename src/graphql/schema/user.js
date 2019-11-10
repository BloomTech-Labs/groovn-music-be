import { gql } from 'apollo-server-express';

// Type definitions for User go here
export const typeDefs = gql`
  extend type Query {
    users: [User!]!
  }
  type User {
    user: String!
  }
`;

// Resolvers for User go here
export const resolvers = {
  Query: {
    users: () => ['Bob', 'Jill'],
  },
};
