import { gql } from 'apollo-server-express';

// Type definitions for Playlists go here
export const typeDefs = gql`
  extend type Query {
    playlists: [Playlist!]!
  }
  type Playlist {
    #maybe playlistID || playlist_id
    playlist: String!
    name: String!
  }
`;

// Resolvers for playlists go here
export const resolvers = {
  Query: {
    users: () => ['cool playlist 01', 'cool playlist 02'],
  },
  Mutation: {
    createPlaylist: async (_, { name }, { dataSources }) => {
      return await dataSources.spotifyApi.createPlaylist(name);
    },
  },
};
