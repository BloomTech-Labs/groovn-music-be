import { RESTDataSource } from 'apollo-datasource-rest';

// This is where we'll configure using the Spotify API
class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async getSavedTracks(token) {
    return await this.get('me/tracks', null, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  async getTracksInfo(token, tracks) {
    return await this.get(
      `tracks?ids=${encodeURIComponent(tracks.toString())}`,
      null,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }
}

export default SpotifyAPI;
