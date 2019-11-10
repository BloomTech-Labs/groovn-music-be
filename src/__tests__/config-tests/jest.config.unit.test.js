import mongoose from 'mongoose';
import { createTestClient } from 'apollo-server-testing';
import { makeExecutableSchema } from 'apollo-server-express';
import gql from 'graphql-tag';

import { testDb, constructTestServer } from '../__utils';

// Creating a fake mongo model to test if Jest is workin'g
const testSchema = new mongoose.Schema({
  test: { type: Boolean, required: true },
});

// Create a new testModel to use for testing
const testModel = new mongoose.model('Test', testSchema);

// Create a 'mockTest' for use when creating mock test data to test config
const mockTest = { test: true };

// Creating an arbitrary resolvers object for use with testing
const resolvers = {
  Query: {
    tests: async () => await testModel.find(),
  },
};

// Creating the type defs used for testing
const typeDefs = gql`
  type Query {
    tests: [Test]!
  }

  type Test {
    test: Boolean!
  }
`;

// Creating a mock test query to test queries
const GET_TESTS = gql`
  query {
    tests {
      test
    }
  }
`;

// Constructing test schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

describe('Jest configuration tests', () => {
  beforeAll(() => testDb.connect());

  afterAll(() => testDb.disconnect());

  it('create & save Jest test data successfully', async () => {
    const validTest = new testModel(mockTest);
    const savedTest = await validTest.save();

    // Object ID should be defined when successfully saved to MongoDB
    expect(savedTest._id).toBeDefined();
    expect(savedTest.test).toBe(true);
  });

  it('can test GraphQL resolvers', async () => {
    const res = await resolvers.Query.tests();

    // Resolver should return an array ot 'tests' which has one object
    // the first item in the array should have test: true
    expect(res).toBeDefined();
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].test).toBe(true);
  });

  it('can test GraphQL queries', async () => {
    // Set up the test ApolloServer
    const { server } = constructTestServer({ schema });
    // Set up a test Apollo client to test queries
    const { query } = createTestClient(server);
    // Run the GET_TESTS query through the test client and use returned data
    const {
      data: { tests },
    } = await query({ query: GET_TESTS });

    // Should return an array of tests. Only one test object entered into array
    // First array object should have a value of test: true
    expect(tests).toBeDefined();
    expect(tests.length).toBeGreaterThan(0);
    expect(tests[0].test).toBe(true);
  });
});
