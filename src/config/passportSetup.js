import passport from 'passport';
const SpotifyStrategy = require('passport-spotify').Strategy;
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
      console.log(profile);

      User.findOne({ firstName: 'as' }).then(currentUser => {
        if (currentUser) {
          console.log(`User is ${currentUser}`);
          done(null, currentUser);
        } else {
          new User({
            firstName: 'asdfasd',
            lastName: 'Gant1212',
            displayName: 'asdsadasd',
            email: 'demontegant1212@gmail.com',
            password: 'heybudy',
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
