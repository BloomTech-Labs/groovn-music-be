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

const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://groovn-frontend.netlify.com'
    : 'http://localhost:3000';

router.get(
  '/auth/spotify/callback',
  SpotifyConfig.authenticate('spotify', {
    failureRedirect: '/auth/spotify',
    successRedirect: REDIRECT_URI,
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(REDIRECT_URI);
});

export { setupSession };
export default router;
