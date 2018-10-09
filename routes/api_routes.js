var db = require("../models");

module.exports = function(app) {


  app.post("/api/register", function(req, res) {
    // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.profile.create(req.body).then(function(user) {
      res.json(user);
    });
  });

  //when user name and password matches we direct user to feed.handlebars
  
 

};