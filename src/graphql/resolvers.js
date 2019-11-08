// Queries for our GraphQL API go here

export const resolvers = {
  Query: {
    hello: () => ({
      world: 'hello',
    }),
  },
};
