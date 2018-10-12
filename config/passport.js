var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
  {
    usernameField: "username"
  },
  function(username, password, done) {
    db.profile.findOne({
      where: {
        username: username
      }
    }).then(function(dbProfile) {
      if (!dbProfile) {
        return done(null, false, {
          message: "Incorrect username."
        });
      }
      else if (!dbProfile.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      return done(null, dbProfile);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;