const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

require('dotenv').config();

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/callback"
  },
  function(accessToken, refreshToken, profile, passportNext) {
        return passportNext(null, {});
    });

module.exports = googleStrategy