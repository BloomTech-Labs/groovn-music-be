import { gql } from 'apollo-server-express';
import User from '../../../models/User/User';

// Type definitions for User go here
export const typeDefs = gql`
  extend type Query {
    userById(id: ID!): User!
    currentUser: User
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

    updateEmail(id: ID!, email: String!): User!

    logout: Boolean
  }

  type User {
    _id: ID!
    spotifyId: String!
    displayName: String!
    email: String!
    accessToken: String
    refreshToken: String
  }
`;

// Resolvers for User go here
export const resolvers = {
  Query: {
    userById: async (_, { id }) => await User.findById(id),
    currentUser: (parent, args, context) => context.getUser(),
  },
  Mutation: {
    logout: (parent, args, context) => context.logout(),
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
      const deletedUser = await User.findByIdAndDelete({ _id: id });
      if (!deletedUser) {
        throw new Error('Cannot find User');
      }
      return deletedUser;
    },
    updateEmail: async (_, { id, email }) => {
      return await User.findOneAndUpdate(
        { _id: id },
        {
          $set: email,
        },
        { returnOriginal: false }
      );
    },
  },
};
