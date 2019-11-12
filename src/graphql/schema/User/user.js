import { gql } from 'apollo-server-express';
import User from '../../../models/User/user';

// Type definitions for User go here
export const typeDefs = gql`
  extend type Query {
    users: [User!]!
  }
  type User {
    username: String!
    id: ID!
    email: String!
    password: String!
    displayName: String!
  }
`;

// Resolvers for User go here
export const resolvers = {
  Query: {
    users: () => ['Bob', 'Jill'],
  }, 
  Mutation: {
    createUser: (_, { email, password } ) => 
  }
};
