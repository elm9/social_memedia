var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {


app.post("/api/register", function (req, res) {
  // Create an Author with the data available to us in req.body
  console.log(req.body);
  db.profile.create(req.body).then(function (user) {
    res.json(user);
  });
});


app.post("/api/login", passport.authenticate('local', {
   // if the username and password match an entry in the database, redirect them to the home feed. 
  // If not alert them that their username or password is incorrect
    successRedirect: '/feed',
    failureRedirect: '/login',
    failureFlash: true
  })
 


);

//when user name and password matches we direct user to feed.handlebars



};