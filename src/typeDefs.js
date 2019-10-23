import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: World!
  }

  type World {
    world: String!
  }
`;
