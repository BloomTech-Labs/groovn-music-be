import { RESTDataSource } from 'apollo-datasource-rest';

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/';
  }
}

export default SpotifyAPI;
