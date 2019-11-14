module.exports = {
  clientId: process.env.CLIENT_ID || '362dfb9edc284c2fb25ccd19cf52a0c8',
  clientSecret: process.env.CLIENT_SECRET || 'e78cbcdf677249be8bdd4d1acfaa5dac',
  dbURI:
    process.env.DBURL ||
    'mongodb://oauthtest:test123@ds239858.mlab.com:39858/oauth-test-example',
  cookieKey: process.env.cookieKey || 'yaybabbbby',
};
