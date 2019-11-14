import passport from 'passport';
const SpotifyStrategy = require('passport-spotify').Strategy;
const LocalStrategy = require('passport-local').Strategy;
import sauce from './theSauce';
import User from '../models/User/User';

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
      clientID: sauce.clientId,
      clientSecret: sauce.clientSecret,
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

const profile = {
      username: '',
      password: '',
      firstName: '',
      lastName: 'random',
      email: ''
    }

passport.use(
  new LocalStrategy(
    profile,
    
    function(profile, done) {
      console.log(profile.lastName);
      User.findOne({ username: profile.username, password: profile.password }).then(currentUser => {
        if (currentUser) {
          console.log(`User is ${currentUser}`);
          done(null, currentUser);
        } else {
          new User({
            displayName: profile.username,
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName
          })
            .save()
            .then(newUser => {
              console.log('new user created' + newUser);
              done(null, newUser);
            });
        }
      });
  })
);