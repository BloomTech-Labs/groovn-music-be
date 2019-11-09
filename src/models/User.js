import mongoose from 'mongoose';

export const User = mongoose.model('User', {
  username: String,
  email: String,
});
