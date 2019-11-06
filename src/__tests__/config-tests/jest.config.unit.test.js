import mongoose from 'mongoose';
import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';

import { testDb, constructTestServer } from '../__utils';

// Creating a fake mongo model to test if Jest is workin'g
const testSchema = new mongoose.Schema({
  test: { type: Boolean, required: true },
});

const testModel = new mongoose.model('Test', testSchema);

const mockTest = { test: true };

const resolvers = {
  Query: {
    tests: async () => await testModel.find(),
  },
};

const typeDefs = gql`
  type Query {
    tests: [Test]!
  }

  type Test {
    test: Boolean!
  }
`;

const GET_TESTS = gql`
  query {
    tests {
      test
    }
  }
`;

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

    expect(res).toBeDefined();
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].test).toBe(true);
  });

  it('can test GraphQL queries', async () => {
    const { server } = constructTestServer({ typeDefs, resolvers });
    const { query } = createTestClient(server);
    const {
      data: { tests },
    } = await query({ query: GET_TESTS });

    // console.log(res.data.tests);
    expect(tests).toBeDefined();
    expect(tests.length).toBeGreaterThan(0);
    expect(tests[0].test).toBe(true);
  });
});
