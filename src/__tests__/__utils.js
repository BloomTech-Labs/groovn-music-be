import mongoose from 'mongoose';

import {
  context as defaultContext,
  typeDefs as defaultTypeDefs,
  resolvers as defaultResolvers,
  ApolloServer,
  SpotifyAPI,
} from '../';

export const testDb = {
  connect: async () => {
    await mongoose.connect(
      process.env.MONGO_URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
      err => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  },
  disconnect: async () => {
    await mongoose.disconnect();
  },
};

export const constructTestServer = ({
  context = defaultContext,
  typeDefs = defaultTypeDefs,
  resolvers = defaultResolvers,
} = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ SpotifyAPI }),
    context,
  });

  return { server, SpotifyAPI };
};
