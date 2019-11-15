const router = require('express').Router();
const passport = require('passport');
import User from '../src/models/User/User';

//Auth login
router.get('/login', (req, res) => {
  res.send(`  <form action="" method="post">
  <div>
      <label>Email</label>
      <div>
          <input type="text" name="email">
      </div>
  </div>
  <div>
      <label>Password</label>
      <div >
          <input type="password" name="password">
      </div>
  </div>
  <input type="submit" value="Login">
  <a href="/auth/signup" >Signup</a>
</form>`);
});
//auth signup
router.get('/signup', (req, res) => {
  res.send(`<form action="" method="post">
  <div>
      <label>Email</label>
      <div>
          <input class="input" type="text" name="email">
      </div>
  </div>
  <div>
      <label>Password</label>
      <div>
          <input type="password" name="password">
      </div>
  </div>
  <div>
  <label>Display Name</label>
  <div>
      <input type="displayName" name="displayName">
  </div>
</div>
  <input type="submit" value="Signup">
  <a href="/auth/login" >Already have account click here</a>
</form>`);
});
router.post('/signup', async (req, res, next) => {
  const body = req.body;
  if (body.email) {
    const exist = await User.findOne({ email: body.email }).countDocuments();

    if (exist) {
      req.alert('error', 'User Already Exists');
      return res.redirect('/auth/signup');
    }

    try {
      const newUser = new User(body);
      await newUser.save();
    } catch (error) {
      next(error);
    }
  }
});

//auth profile
router.get('/profile', (req, res) => {
  res.send('Profile page');
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

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
  }),
  function(req, res) {
    res.send('<h1>Success</h1>');
  }
);

//Local host testing

module.exports = router;
