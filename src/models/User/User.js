import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    //required: false,
  },
  lastName: {
    type: String,
    //required: false,
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
    required: true,
    unique: true,
    match: /(?:[a-z0-9!#$%&‘+/=?^{|}~-]+(?:\.[a-z0-9!#$%&‘+/=?^{|}~-]+)*|“(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*“)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  },
  password: {
    type: String,
    // required: true,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});
const User = mongoose.model('User', UserSchema);
export default User;
