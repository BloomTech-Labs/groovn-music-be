const mongoose = require ('mongoose');

const UserSchema =  new mongoose.Schema({

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
        match: ['please fill in a valid email address']
    },

    password: {
        type: String,
        required: 'Password is required',
        min: [9, "Passwords must be between 8 and 64 characters"],
        max: [64, "Passwords must be between 8 and 64 characters"],
    },

    confirmPass: {
        type: String,
        required: "Please conrim password",
    },

    country: {
        type: String,
        enum: ["US"]
    },

    age: {
        type: String,
        enum: ["Dont Wish To Specify", "13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"]
    },
    
    overThirteen: {
        type: boolean,
        required: function () {
            if (this.age == "Don't Wish To Specify") {
                return true
            } else {
                return false;
            }
        }
    },

    //TODO: add birthday
	gender: {
		type: String,
		enum: ["Male", "Female", "Non-Binary", "Don't Wish To Specify"]
	},
	images: {
		type: Object, //array of strings
	},
	playlist_id: {
		type: [Number],
	},
	key: { //spotifyId
		type: Number,
		unique: true
	},
	userPlaylists: [{
		type: ObjectId,
		ref: "Playlist"
	}],
	likedSongs: [{
		type: ObjectId,
		ref: "Track"
	}],
	recommendedSongs: [{
		type: ObjectId,
		ref: "RecommendedTracks"
	}],
	recommendedArtists: [{
		type: ObjectId,
		ref: "RecommendedArtists"
	}],
	listenHistory: [{
		type: ObjectId,
		ref: "ListenHistory"
	}],
	type: "user",
	product: {
		type: String,
		enum: ["Open", "Premium"]
}
})

const User = mongoose.model("User", UserSchema);

module.exports = User; 