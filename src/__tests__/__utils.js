import mongoose from 'mongoose';

import {
  context as defaultContext,
  schema as defaultSchema,
  ApolloServer,
  SpotifyAPI,
} from '../';

// This is a utility for connecting to and stopping the testing
// MongoDB Memory Server
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

// This is a utility for setting up the ApolloServer used for testing
export const constructTestServer = ({
  context = defaultContext,
  schema = defaultSchema,
} = {}) => {
  const server = new ApolloServer({
    schema,
    dataSources: () => ({ SpotifyAPI }),
    context,
  });

  return { server, SpotifyAPI };
};
