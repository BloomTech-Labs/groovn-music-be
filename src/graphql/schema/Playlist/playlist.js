import { gql } from 'apollo-server-express';

// Type definitions for Playlists go here
export const typeDefs = gql`
  extend type Query {
    getPlaylists: [Playlist!]!
  }

  extend type Mutation {
    createPlaylist(name: String!, description: String): [Playlist]
    addTracks(playlistId: String, tracks: [String]): SnapshotID
  }

  type Playlist {
    #maybe playlistID || playlist_id
    #playlist: String!
    name: String!
    description: String
  }

  type SnapshotID {
    snapshot_id: String
  }
`;

// Resolvers for playlists go here
export const resolvers = {
  Query: {
    users: () => ['cool playlist 01', 'cool playlist 02'],
    getPlaylists: async (_, __, { dataSources, getUser }) => {
      const { accessToken } = await getUser();
      return await dataSources.spotifyApi.getCurrentUserPlaylists(accessToken);
    },
  },
  Mutation: {
    createPlaylist: async (
      _,
      { name, description },
      { dataSources, getUser }
    ) => {
      console.log(await getUser());
      const { accessToken, spotifyId } = await getUser();
      return await dataSources.spotifyApi.createPlaylist(
        accessToken,
        spotifyId,
        {
          name,
          description,
        }
      );
    },
    addTracks: async (_, { playlistId, tracks }, { dataSources }) => {
      return dataSources.spotifyApi.addTrackToPlaylist(playlistId, tracks);
    },
  },
};
