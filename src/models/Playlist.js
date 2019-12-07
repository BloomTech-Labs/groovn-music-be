import mongoose from 'mongoose';

// const { ObjectId } = mongoose.Schema.Types;

const PlayListSchema = new mongoose.Schema({
  // key: {
  //   // playlist_id
  //   type: Number,
  // },
  collaborative: { type: Boolean }, // Returns true only if user modification is allowed by owner. Otherwise returns false.
  description: { type: String }, // Only for modified playlist, otherwise null
  name: {
    type: String,
    required: true,
  }, //  Name of playlist
  id: {
    type: String,
  },
  playlistId: { type: String }, // The spotify ID for the playlist
  // owner: {
  //   // The user who owns the playlist
  //   type: ObjectId, // Public user object
  //   ref: 'User',
  // },
  // tracks: {
  //   description: Array,
  //   type: ObjectId,
  //   ref: 'Track',
  // },
  // isPublic: {
  //   type: Boolean, // True if the playlist is public, false the playlist is private. Null the playlist status is not relevant.
  // },
  // snapshotID: {
  //   type: String,
  // },
  // type: {
  //   description: String,
  // },

  // uri: {
  //     description: String  // The Spotify URI (Uniform Resource Indicator) for the playlist
  // },
});

const Playlist = mongoose.model('Playlist', PlayListSchema);
export default Playlist;
