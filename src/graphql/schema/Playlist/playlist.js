import { gql } from 'apollo-server-express';

// Type definitions for Playlists go here
export const typeDefs = gql`
  extend type Query {
    playlists: [Playlist!]!
  }
  type Playlist {
    playlist: String!
  }
`;

// Resolvers for playlists go here
export const resolvers = {
  Query: {
    users: () => ['cool playlist 01', 'cool playlist 02'],
  },
};
