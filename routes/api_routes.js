var db = require("../models");
var passport = require("../config/passport");
const AWS = require("aws-sdk");
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


  app.post("/api/login", function (req, res) {

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


  // when you need to crate an account
  // app.post("/api/profile", ){
  //   function createAlbum(albumName) {
  //     albumName = albumName.trim();
  //     if (!albumName) {
  //       return alert('Usernames must contain at least one non-space character.');
  //     }
  //     if (albumName.indexOf('/') !== -1) {
  //       return alert('Usernames cannot contain slashes.');
  //     }
  //     var albumKey = encodeURIComponent(albumName) + '/';
  //     s3.headObject({
  //       Key: albumKey
  //     }, function (err, data) {
  //       if (!err) {
  //         return alert('Username already exists.');
  //       }
  //       if (err.code !== 'NotFound') {
  //         return alert('There was an error: ' + err.message);
  //       }
  //       s3.putObject({
  //         Key: albumKey
  //       }, function (err, data) {
  //         if (err) {
  //           return alert('There was an error: ' + err.message);
  //         }
  //         alert('Successfully created account.');
  //       });
  //     });
  // }
  
  
  
  // }

};