import { RESTDataSource } from 'apollo-datasource-rest';

const testTracks = {
  request: [
    '4MUF5hjHDYbJF2YtKFp0MI',
    '6e8Voz3K2vcOsydNtxbwaQ',
    '4ZD1VFoJ9LyV65KhPO9TZ5',
    '35cOyocq8Gb6UcT0NWeTwn',
    '0uuH3Htpahzscc1YSG833Z',
    '5DjNBCWKdD2y8zyIxmKbbl',
  ],
};

// This is where we'll configure using the Recommendation Engine API
class RecommendationEngine extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://sensemodel.herokuapp.com/';
  }

  async getRecommendation(tracks) {
    return await this.post('model1_flexible', testTracks);
  }
}

export default RecommendationEngine;
