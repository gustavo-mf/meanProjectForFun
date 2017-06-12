'use strict';

const express = require('express');
const router = express.Router();
// passport e google strategy
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
 
passport.use(new GoogleStrategy({
    clientID: '6077289123-og9vtevo3q39hoteqv38vrvg1qahtu4b.apps.googleusercontent.com',
    clientSecret: 'WLaX1mPT27IIuuNrDQYEDqxv',
    callbackURL: "http://127.0.0.1:8080/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log(token);
    Usuario.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
/*passport.use(new GooglePlusStrategy({
    clientId: '6077289123-og9vtevo3q39hoteqv38vrvg1qahtu4b.apps.googleusercontent.com',
    clientSecret: 'WLaX1mPT27IIuuNrDQYEDqxv'
  },
  function(tokens, profile, done) {
    Usuario.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));*/

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' })
);
// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;