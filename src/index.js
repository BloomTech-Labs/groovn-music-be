import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import schema from './graphql/schema';
import SpotifyAPI from './graphql/datasources/spotify';
import authRoutes, { setupSession } from './auth/routes';

// Create express app instance
const app = express();

// Setup session
setupSession(app);

//middleware
app.use(authRoutes);

// Setup dataSources our resolvers need
const dataSources = () => ({
  spotifyApi: new SpotifyAPI(),
});

// Function that sets up global context for resolvers.
// Will probably be used for authentication
const context = async ({ req }) => ({
  getUser: () => {
    const { user } = req;
    return user;
  },
  logout: () => req.logout(),
});

// Async startServer function so we can connect to MongoDB before the server
// launches
const startServer = async () => {
  // Create a new ApolloServer instance using our typeDefs and resolvers
  const server = new ApolloServer({
    schema,
    dataSources,
    context,
    playground: {
      settings: {
        'request.credentials': 'same-origin',
      },
    },
  });

  // Apply the express middleware if there are any
  server.applyMiddleware({ app });

  // Set database URI based on whether prod or dev
  const DATABASE_URL =
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_DATABASE_URL
      : process.env.DEV_DATABASE_URL;

  // Connect to mongoose using DATABASE_URL and await the promise to resolve
  await mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'groovn',
  });

  // Set port
  const PORT = process.env.PORT || 4000;

  // Launch the server
  app.listen(PORT, () => {
    console.log(
      `🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

// Run the start server function to actually start the server

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export { dataSources, context, schema, ApolloServer, SpotifyAPI };
