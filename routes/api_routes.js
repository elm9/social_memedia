var db = require("../models");
var passport = require("../config/passport");
const AWS = require("aws-sdk");
const S3_BUCKET = process.env.S3_BUCKET;
var bucketName = 'socialmemedia';
var bucketRegion = 'us-east-1';
AWS.config.update({
  region: bucketRegion
});
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: bucketName
  }
});
var document = require("../views");

module.exports = function (app) {


  app.post("/api/register", function (req, res) {

    s3.listBuckets(function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Bucket List", data.Buckets);
      }
    });
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

  
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
      res.json("/feed");
    });

  // when user name and password matches we direct user to feed.handlebars


  // when you need to crate an account
  app.post("/api/profile", ){
    
  }
};