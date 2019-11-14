import { gql } from 'apollo-server-express';
import User from '../../../models/User/User';

// Type definitions for User go here
export const typeDefs = gql`
  extend type Query {
    users: [User!]!
    userById(id: ID!): User!
  }

  extend type Mutation {
    createUser(
      firstName: String!
      lastName: String
      email: String!
      password: String!
      displayName: String!
    ): User

    deleteUser(id: ID!): User!
  }

  type User {
    firstName: String!
    lastName: String!
    id: ID!
    email: String!
    password: String!
    displayName: String!
  }
`;

// Resolvers for User go here
export const resolvers = {
  Query: {
    userById: async (_, { id }) => await User.findById(id),
    users: () => ['Bob', 'Jill'],
  },
  Mutation: {
    createUser: async (
      _,
      { email, password, firstName, lastName, displayName }
    ) => {
      const newUser = new User({
        email,
        password,
        firstName,
        lastName,
        displayName,
      });
      return await newUser.save();
    },
    deleteUser: async (_, { id }) => {
      const deletedUser = await User.findByIdAndDelete({ id });
      if (!deletedUser) {
        throw new Error('Cannot find User');
      }
      return deletedUser;
    },
  },
};
