import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';

import { DATABASE_URL, PORT } from './util/env';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import SpotifyAPI from './graphql/datsources/spotify';

// Setup dataSources our resolvers need
const dataSources = () => ({
  SpotifyAPI,
});

// Function that sets up global context for resolvers.
// Will probably be used for authentication
const context = async ({ req }) => {
  return {};
};

// Create express app instance
const app = express();

// Mongoose  config
mongoose.set('useFindAndModify', false);

// Async startServer function so we can connect to MongoDB before the server
// launches
const startServer = async () => {
  // Create a new ApolloServer instance using our typeDefs and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context,
  });

  // Apply the express middleware if there are any
  server.applyMiddleware({ app });

  // Connect to mongoose using DATABASE_URL and await the promise to resolve
  await mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'groovn',
  });

  // Launch the server
  app.listen(PORT, () => {
    console.log(
      `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

// Run the start server function to actually start the server
startServer();
