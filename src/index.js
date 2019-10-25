import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';

import { DATABASE_URL, PORT } from './util/env';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

// Create express app instance
const app = express();

// Mongoose  config
mongoose.set('useFindAndModify', false);

// Async startServer function so we can connect to MongoDB before the server
// launches
const startServer = async () => {
  // Create a new ApolloServer instance using our typeDefs and resolvers
  const server = new ApolloServer({ typeDefs, resolvers });

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
