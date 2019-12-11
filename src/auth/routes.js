import express from 'express';
import SpotifyConfig, { setupSession } from './auth';

const router = express.Router();

router.get(
  '/auth/spotify',
  SpotifyConfig.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'user-read-recently-played',
      'user-top-read',
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-modify-playback-state',
      'user-library-read',
      'playlist-read-collaborative',
      'playlist-modify-private',
      'playlist-modify-public',
    ],
    showDialog: true,
  })
);

router.get(
  '/auth/spotify/callback',
  SpotifyConfig.authenticate('spotify', {
    failureRedirect: '/auth/spotify',
<<<<<<< HEAD
    successRedirect: 'http://localhost:3000',
=======
    successRedirect: '/graphql',
    // successRedirect: '/home-page',
>>>>>>> 30f7f3f5c3447d386068a67a458b5a9df4d62ffe
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/graphql');
});

export { setupSession };
export default router;
