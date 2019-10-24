// File that contains environment variables

// Databse URL
export const DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://localhost:27017/groovn';

// Server port
export const PORT = process.env.PORT || 4000;
