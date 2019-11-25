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

  async createPlaylist(token, { playlistName, playlistDesc }) {
    return await this.post(
      `users/${user_id}/playlists/`,
      { name: playlistName, description: playlistDesc },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }

  async getPlaylists() {
    return await this
      .get /* playlist path to Spotify playlist API */
      /* params needed */
      ();
    // get user's playlists
  }

  async addTrackToPlaylist(/* playlist_id  */) {
    return await this.post(/* path to Spotify API to add tracks to playlist */);
  }
}

export default SpotifyAPI;
