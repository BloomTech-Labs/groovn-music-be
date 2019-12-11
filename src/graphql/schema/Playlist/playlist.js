import { gql } from 'apollo-server-express';
import Playlist from '../../../models/Playlist';
import { resolvers as rResolvers } from '../Recommendation/recommendationEngine';
import { resolvers as sResolvers } from '../Spotify/spotify';

const helpers = {
  createPlaylist: async (
    _,
    { name, description },
    { dataSources, getUser }
  ) => {
    const { accessToken, spotifyId } = await getUser();
    const { id } = await dataSources.spotifyApi.createPlaylist(
      accessToken,
      spotifyId,
      {
        name,
        description,
      }
    );
    const newPlaylist = new Playlist({
      playlistId: id,
      name,
      description,
    });
    return await newPlaylist.save();
  },
  addTracks: async (_, { tracks, playlistId }, { dataSources, getUser }) => {
    const { accessToken } = await getUser();
    return dataSources.spotifyApi.addTrackToPlaylist(
      accessToken,
      tracks,
      playlistId
    );
  },
};
// Type definitions for Playlists go here
export const typeDefs = gql`
  extend type Query {
    getPlaylists: [Playlist]
  }

  extend type Mutation {
    createPlaylist(name: String!, description: String): Playlist
    addTracks(tracks: [String]): Snapshot
    createRecommendedPlaylist(name: String, description: String): Playlist
  }

  type Playlist {
    _id: String!
    name: String!
    description: String
    id: String!
    collaborative: Boolean
    tracks: [String!]
  }

  type Snapshot {
    snapshot_id: String
  }
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

      return result.items.map(({ id, name, description, collaborative }) => {
        const playlist = new Playlist({
          playlistId: id,
          name,
          description,
          collaborative,
        });
        return playlist.save();
      });
    },
  },
  Mutation: {
    createPlaylist: helpers.createPlaylist,
    addTracks: helpers.addTracks,
    createRecommendedPlaylist: async (
      _,
      { name, description },
      { dataSources, getUser }
    ) => {
      const { playlistId } = await helpers.createPlaylist(
        null,
        { name, description },
        { dataSources, getUser }
      );
      const likedTracks = await sResolvers.Query.getLikedTracks(null, null, {
        dataSources,
        getUser,
      });
      const recommendedSongs = await rResolvers.Query.getRecommendation(
        null,
        likedTracks.map(track => track.id),
        { dataSources }
      );
      helpers.addTracks(
        null,
        { tracks: recommendedSongs, playlistId },
        { dataSources, getUser }
      );
      const savedPlaylist = await Playlist.findOne({ playlistId });
      return {
        _id: savedPlaylist._id,
        name: savedPlaylist.name,
        description: savedPlaylist.description,
        tracks: recommendedSongs,
      };
    },
  },
};
