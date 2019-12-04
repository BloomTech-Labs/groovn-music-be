import { gql } from 'apollo-server-express';

// Type definitions for Recommendations go here
export const typeDefs = gql`
  extend type Query {
    getRecommendation(tracks: [String!]): [String!]
  }
`;

// Resolvers for Recommendations go here
export const resolvers = {
  Query: {
    getRecommendation: async (_, tracks, { dataSources }) => {
      const { data } = await dataSources.recommendationApi.getRecommendation(
        tracks
      );
      return data;
    },
  },
};
