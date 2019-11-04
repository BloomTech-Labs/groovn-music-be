import mongoose from 'mongoose';
import testDb from '../../util/testDb';

// Creating a fake mongo model to test if Jest is workin'g
const testSchema = new mongoose.Schema({
  test: { type: Boolean, required: true },
});

const testModel = new mongoose.model('Test', testSchema);

describe('Jest configuration tests', () => {
  beforeAll(() => testDb.connect());

  afterAll(() => testDb.disconnect());

  it('create & save Jest test data successfully', async () => {
    const validTest = new testModel({ test: true });
    const savedTest = await validTest.save();

    // Object ID should be defined when successfully saved to MongoDB
    expect(savedTest._id).toBeDefined();
    expect(savedTest.test).toBe(true);
  });
});
