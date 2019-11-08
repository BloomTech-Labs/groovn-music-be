import { User } from './models/User';

// Queries for our GraphQL API go here

export const resolvers = {
  Query: {
    hello: () => ({
      world: 'hello',
    }),
    getUsers: () => User.find(),
  },
  Mutation: {
    createUser: async (_, { username, email }) => {
      const user = new User({ username, email });
      await user.save();
      return user;
    },
  },
};
