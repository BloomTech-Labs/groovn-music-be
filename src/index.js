import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import passportSetup from './config/passportSetup';
import schema from './graphql/schema';
import SpotifyAPI from './graphql/datasources/spotify';
import passport from 'passport';
import authRoutes from '../auth/auth';

// Configure environment variables
dotenv.config();

// Create express app instance
const app = express();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [cookieSession],
  })
);

//init passport
app.use(passport.initialize());
app.use(passport.session());

//middleware
app.use('/auth', authRoutes);

//test

app.get('/', (req, res) => {
  res.send(
    `<div><h1>Just testing for oAuth</h1><nav><ul><li><a href="/auth/logout">Logout</a></li><li><a href="/auth/login">Login</a></li><li><a href="/">Home</a></li><li><a href="/auth/spotify">Spotify login right here</a></li></ul></nav></div>`
  );
});

// Setup dataSources our resolvers need
const dataSources = () => ({
  SpotifyAPI,
});

// Function that sets up global context for resolvers.
// Will probably be used for authentication
const context = async () => {
  return {};
};

// Mongoose  config
mongoose.set('useFindAndModify', false);

// Async startServer function so we can connect to MongoDB before the server
// launches
const startServer = async () => {
  // Create a new ApolloServer instance using our typeDefs and resolvers
  const server = new ApolloServer({
    schema,
    dataSources,
    context,
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
