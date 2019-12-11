import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import session from 'express-session';
import User from '../models/User/User';

const PORT = process.env.PORT;

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/spotify/callback`,
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      const email =
        profile.emails && profile.emails[0] && profile.emails[0].value;
      const matchingUser = await User.findOne({ email });
      if (matchingUser) {
        if (accessToken !== User.accessToken) {
          matchingUser.accessToken = accessToken;
        }
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

export const setupSession = app => {
  //init passport
  app.use(
    session({
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

export default passport;
