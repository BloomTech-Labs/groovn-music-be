import passport from 'passport';
const SpotifyStrategy = require('passport-spotify').Strategy;
const LocalStrategy = require('passport-local').Strategy;
import User from '../models/User/User';
import dotenv from 'dotenv';

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne(id).then(user => {
    done(null, user.id);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/spotify/redirect',
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      //check if in db, if not then create and save user
      console.log(User);
      console.log('just making sure i get fired offfffffffffff');
      console.log(profile._json.email);

      User.findOne({ email: profile._json.email }).then(currentUser => {
        if (currentUser) {
          console.log(`User is ${currentUser}`);
          done(null, currentUser);
        } else {
          new User({
            displayName: profile.displayName,
            email: profile._json.email,
          })
            .save()
            .then(newUser => {
              console.log('new user created' + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    },
    function(req, email, password, done) {
      User.findOne({ email: email }).then(currentUser => {
        if (currentUser) {
          console.log(`User is ${currentUser}`);
          done(null, currentUser);
        } else {
          req.alert('error', 'invalid information');
          return done(null, false);
        }
      });
    }
  )
);
