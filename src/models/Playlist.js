import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const PlayListSchema =  new mongoose.Schema({
    key: { // playlist_id
        type: Number
    },
    collaborative: Boolean,     // Returns true only if user modification is allowed by owner. Otherwise returns false.
    description: String,    // Only for modified playlist, otherwise null 
    name: String, //  Name of playlist
    id: String,        // The spotify ID for the playlist
    owner: {     // The user who owns the playlist
        type: ObjectId,  // Public user object 
        ref: "User"
    },
    tracks: {
        description: Array, 
        typa: ObjectId,  
        ref: "Track"
    },
    public: {
        type: Boolean || null   // True if the playlist is public, false the playlist is private. Null the playlist status is not relevant. 
    },
    type: {
        description: String,
    },

    uri: {
        description: String  // The Spotify URI (Uniform Resource Indicator) for the playlist 
    },
    
});

const Playlist = mongoose.model('Playlist', PlayListSchema);
export default Playlist;