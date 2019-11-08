import { RESTDataSource } from 'apollo-datasource-rest';

// This is where we'll configure using the Spotify API
class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/';
  }
}

export default SpotifyAPI;
