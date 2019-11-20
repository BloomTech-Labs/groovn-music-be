import { gql } from 'apollo-server-express';

// Type definitions for Spotify go here
export const typeDefs = gql`
  extend type Query {
    getLikedTracks: [Track]
  }

  type Track {
    id: ID!
    name: String!
    albumName: String!
    albumCover: String!
    artists: [Artist!]
  }

  type Artist {
    id: ID!
    name: String!
  }
`;

// Resolvers for Spotify go here
export const resolvers = {
  Query: {
    getLikedTracks: async (_, __, { dataSources, getUser }) => {
      const { accessToken } = getUser();
      const savedTracks = await dataSources.spotifyApi.getTracks(accessToken);

      return savedTracks.items.map(
        ({ track: { id, name, album, artists } }) => ({
          id,
          name,
          albumName: album.name,
          albumCover: album.images[0].url,
          artists,
        })
      );
    },
  },
};
