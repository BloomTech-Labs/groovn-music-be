import { makeExecutableSchema, gql } from 'apollo-server-express';
import { merge } from 'lodash';

import {
  typeDefs as userTypeDefs,
  resolvers as userResolvers,
} from './User/user';

import {
  typeDefs as playlistTypeDefs,
  resolvers as playlistResolvers,
} from './Playlist/playlist';

import {
  typeDefs as spotifyTypeDefs,
  resolvers as spotifyResolvers,
} from './Spotify/spotify';

import {
  typeDefs as recommendationTypeDefs,
  resolvers as recommendationResolvers,
} from './Recommendation/recommendationEngine';

const defaultTypes = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    defaultTypes,
    userTypeDefs,
    playlistTypeDefs,
    spotifyTypeDefs,
    recommendationTypeDefs,
  ],
  resolvers: merge(
    userResolvers,
    playlistResolvers,
    spotifyResolvers,
    recommendationResolvers
  ),
});
