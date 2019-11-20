import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import User from '../models/User/User';

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/auth/spotify/callback',
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      // const users = User.getUsers();
      // const matchingUser = users.find(user => user.spotifyId === profile.id);
      const email =
        profile.emails && profile.emails[0] && profile.emails[0].value;
      const matchingUser = User.findOne({ email }).countDocuments() > 0;

      if (matchingUser) {
        done(null, matchingUser);
        return;
      }

      const newUser = new User({
        spotifyId: profile.id,
        displayName: profile.displayName,
        email,
        accessToken,
        refreshToken,
      });
      newUser.save();
      done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
