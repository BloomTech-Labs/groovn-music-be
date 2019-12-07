import { gql } from 'apollo-server-express';
// import Playlist from '../../../models/Playlist';

// Type definitions for Playlists go here
export const typeDefs = gql`
  extend type Query {
    getPlaylists: [Playlist]
  }

  extend type Mutation {
    createPlaylist(name: String!, description: String): Playlist
    addTracks(playlistId: String, tracks: [String]): String
    deleteTracks(tracks: [String]): String 
    deletePlaylist(playlistId: String): String
  }

  type Playlist {
    name: String!
    description: String
    id: String!
    collaborative: Boolean
    snapshot_id: String
  }

  deleteTracks(tracks: String!): String! 
  deletePlaylist(playlistId: String!): String!

`;

// Resolvers for playlists go here
export const resolvers = {
  Query: {
    // users: () => ['cool playlist 01', 'cool playlist 02'],
    getPlaylists: async (_, __, { dataSources, getUser }) => {
      const { accessToken } = await getUser();
      const result = await dataSources.spotifyApi.getCurrentUserPlaylists(
        accessToken
      );
      return result.items.map(
        ({ id, name, description, collaborative, snapshot_id }) => ({
          id,
          name,
          description,
          collaborative,
          snapshot_id,
        })
      );
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
    deleteTracks: async (_, { tracks }) => {
      const deleteTracks = await User.findByIdAndDelete({ _id: id });
      if (!deleteTracks) {
        throw new Error('Cannot find track');
      }
      return deleteTracks;
    },
    // skeleton prep to create a delete method to delete a track from current playlist
  },
};
