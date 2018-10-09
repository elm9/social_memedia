var db = require("../models");

module.exports = function(app) {


  app.post("/api/register", function(req, res) {
    // Create a user with the data available to us in req.body
    console.log(req.body);
    db.profile.create(req.body).then(function(user) {
      res.json(user);
    });
  });

  
  app.post("/api/login", function(req, res) {
    // if the username and password match an entry in the database, redirect them to the home feed. 
    // If not alert them that their username or password is incorrect
  });

 

};