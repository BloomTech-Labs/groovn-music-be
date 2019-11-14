const router = require('express').Router();
const passport = require('passport');

//Auth login
router.get('/login', (req, res) => {
  res.send(`<h1>Welcome to log on page</h1>`);
});

// auth logout
router.get('/logout', (req, res) => {
  res.send('login out');
});
// auth with spotify
router.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
  })
);
//callback
router.get(
  '/spotify/redirect',
  passport.authenticate('spotify'),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
