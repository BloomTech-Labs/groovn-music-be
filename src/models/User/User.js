import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  displayName: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'Email address is required',
    unique: true,
    match: ['please fill in a valid email address'],
  },

  password: {
    type: String,
    required: 'Password is required',
    min: [9, 'Passwords must be between 8 and 64 characters'],
    max: [64, 'Passwords must be between 8 and 64 characters'],
  },

  country: {
    type: String,
    enum: ['US'],
  },

  age: {
    type: String,
    enum: [
      'Dont Wish To Specify',
      '13-17',
      '18-24',
      '25-34',
      '35-44',
      '45-54',
      '55-64',
      '65-74',
      '75+',
    ],
  },

  overThirteen: {
    type: Boolean,
    required: function() {
      if (this.age == "Don't Wish To Specify") {
        return true;
      } else {
        return false;
      }
    },
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-Binary', "Don't Wish To Specify"],
  },

  images: {
    type: Object, //array of strings
  },

  playlist_id: {
    type: [Number],
  },

  key: {
    type: Number,
    unique: true,
  },

  userPlaylists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlists',
    },
  ],

  // Below items will be worked on later, might not be necessary.

  // likedSongs: [{
  // 	type: ObjectId,
  // 	ref: "Track"
  // }],
  // recommendedSongs: [{
  // 	type: ObjectId,
  // 	ref: "RecommendedTracks"
  // }],
  // recommendedArtists: [{
  // 	type: ObjectId,
  // 	ref: "RecommendedArtists"
  // }],
  // listenHistory: [{
  // 	type: ObjectId,
  // 	ref: "ListenHistory"
  // }],

  type: 'user',
  product: {
    type: String,
    enum: ['Open', 'Premium'],
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
