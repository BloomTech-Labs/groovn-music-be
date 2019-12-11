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

  async createPlaylist(token, user_id, { name, description }) {
    return await this.post(
      `users/${user_id}/playlists/`,
      { name, description },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }

  async getCurrentUserPlaylists(token) {
    // get user's playlists
    return await this.get('me/playlists', null, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  async getPlaylistTracks(token, playlist_id) {
    return await this.get(`playlists/${playlist_id}/tracks`, null, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  async addTrackToPlaylist(token, tracks, playlist_id) {
    const trackURIs = tracks.map(track => `spotify:track:${track}`);
    console.log(token);
    return await this.post(
      `playlists/${playlist_id}/tracks`,
      {
        uris: trackURIs,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
  }

  async deleteTracks(token, playlist_id, tracks) {
    return await this.delete(`playlists/${playlist_id}/tracks`, tracks, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}

export default SpotifyAPI;
