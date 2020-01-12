# LabsPT5 - GroovnMusic

Deployed app ======> [GroovnMusic](www.groovnmusic.com).

## GroovnMusic Developers

[<img src="https://avatars0.githubusercontent.com/u/47765271?s=460&v=4" width = "100" />]
[ DJ Zaragoza ](https://github.com/djzaragoza) 
[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/djzaragoza)
[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/dj-zaragoza-38479212) [<img src="https://avatars3.githubusercontent.com/u/12819528?s=460&v=4" width = "100" />]
[ Christopher Tutor ](https://github.com/pherpher089) 
[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/pherpher089) 
[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/christopher-tutor-68a3b796/) [<img src="https://avatars1.githubusercontent.com/u/7123647?s=460&v=4" width = "100" />]
[ Douglas Campbell ](https://github.com/Campbelld84) 
[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Campbelld84) 
[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/douglas-campbell-dev) [<img src="https://avatars1.githubusercontent.com/u/24638769?s=460&v=4" width = "100" />]
[ Robert Gant ](https://github.com/gant123) 
[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/gant123)
[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/robert-gant-258978105) [<img src="https://avatars0.githubusercontent.com/u/330607?s=460&v=4" width = "100" />]
[ Dominic Torruellas ](https://github.com/djtorel) 
[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/djtorel)
[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/dom-torr) [<img src="https://avatars0.githubusercontent.com/u/36387815?s=460&v=4" width = "100" />]
[ Jason Pham ](https://github.com/extrajp2014) 
[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/extrajp2014) 
[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jason-pham-146950180) [<img src="https://avatars0.githubusercontent.com/u/43683321?s=460&v=4" width = "100" />]
[ Jason Holloway ](https://github.com/jjamaltwin)
[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jjamaltwin) 
[ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)
                      
<br>
<br>

## Project Overview

[Trello Board](https://trello.com/b/wRlpwQHc/groovn-music)

[Product Canvas]()

What is GroovnMusic?

GroovnMusic is a re-imagined music app that allows users to create a personalized playlist solely recommended for them, based on songs they like.

### Key Features

-    Ability for the user to generate a recommended playlist based by "Liked" songs
-    Personalized playlists
-    User-friendly, ease of navigation
-    Millions of songs to explore

## Tech Stack

### Front end built using:

#### React | React Hooks / Context | Passport.js and OAuth 

Why did you choose this framework?

-    We decided to utilize React and React Hooks library because of the power it can provide to our product.  Utilizing the Hooks concpt by neglecting the use of writing a class was time-saving.  
-    Deviding to use React Context was a simple and smart decision by our team mainly because of it being a big part of the React library.  It gave us the ability to pass data through a component with ease.  A great way to stream line writing code.

#### Front end deployed to `http://groovn-frontend-prod.netlify.com/`

#### [Back end](https://github.com/Lambda-School-Labs/groovn-music-be) built using:

####

-    Apollo GraphQL - writing queries, combining APIs and databases
-    Node.js - JS runtime environent
-    Express - web framework for Node.js
-    MongoDB - database 
-    Mongoose - query building and schema

# APIs

## Spotify API 

We decided to use the Spotify API mainly for build time and production.  We wanted our users to have the ability to create a playlist and play their music.  By using Spotify's API, it's based on REST principles and the endpoints return JSON metadata about music artists, albums, and tracks, directly from the Spotify Data Catalogue.  It also provides access to user related data, like playlists and music that the user saves in their music library.

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/me';
  }

  async getSavedTracks(token) {
    return await this.get('tracks', null, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}

export default SpotifyAPI;

## Context API

We used the Context API solely-based on using the React library.  Utilizing Context, it creates an object for us.  Once React renders a componentk that subscribes to a Context object, it will read the context value closest to the matching Provider above in the tree. 

export default function App() {
  return (
    <MainContextProvider>
      <div className="app">
        <Route to exact path="/landing-page" component={LandingPage} />
        <Route exact to="/protected" component={PrivateRoute} />
      </div>
    </MainContextProvider>
  );
}

# Environment Variables

DEV_DATABASE_URL=‘mongodb://localhost:27017/groovn’ - app database
SPOTIFY_CLIENT_ID=‘abe6bf42ad914ede9a28b1c8db260cb8’ - Spotify user ID
SPOTIFY_CLIENT_SECRET=‘891af5d42954449f9c9660b6f11dfa3b’ - key used for Spotify users logging in and out
SESSION_SECRET=‘d%wP3p&uQ&8&%TzZh@uzf!y#J%*!WR4X’ - key used for signing and/or encrypting cookies set by our app
PORT=‘4000’ - port used for our app
NODE_ENV = ‘Development’ - development environment

# Content Licenses

| Image/License(s) Filename | Source / Creator | License                                                                      |
| ------------------------- | ---------------- | ---------------------------------------------------------------------------- |
| Spotify API               | Team             | [Spotify API](https://developer.spotify.com/terms/#iii) |

# Testing

Testing of this application was very important and crucial for the overall success of the app and its functionality.  

Each developer did a series of tests on both front-end and back-end to ensure the overall functionality was working.  The following tests were completed throughout the build:
  - user authentication
  - routes
  - database
  - queries created
  - playlist creation
  - recommendation engine
  - recommended playlist
  - component functionality 

In addition, all pull requests were reviewed by one or more team members, and merges were supervised by our project manager.

The application for the most part was set up to continuously deploy to Netlify and Heroku. 

# Installation Instructions

🚫explain how to install the required dependencies to get this project up and running with yarn and NPM

## Other Scripts

🚫replace these examples with your own

    * typecheck - runs the TypeScript compiler
    * build - creates a build of the application
    * start - starts the production server after a build is created
    * test - runs tests in **tests** directory \* eject - copy the configuration files and dependencies into the project so you have full control over them

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](🚫_link to your backend readme here_) for details on the backend of our project.
