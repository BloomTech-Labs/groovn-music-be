import { RESTDataSource } from 'apollo-datasource-rest';

// This is where we'll configure using the Spotify API
class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/me';
  }

  async getTracks(token) {
    return await this.get('tracks', null, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}

export default SpotifyAPI;
