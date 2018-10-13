const db = require("../models");
const passport = require("../config/passport");
const AWS = require("aws-sdk");
const Busboy = require('busboy');
const bucketName = 'socialmemedia';
const bucketRegion = 'us-east-1';

AWS.config.update({
  region: bucketRegion
});
const s3 = new AWS.S3();

module.exports = function (app) {


  app.post("/api/register", function (req, res) {

    // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.profile.create(req.body).then(function (user) {
      // res.json(user);

      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/feed');
      });
    });
  });


  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/feed");
  });


  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username
      });
    }
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });


  // upload image to S3
  app.post("/api/upload", function (req, res) {
    const imageUpload = (req.body.imageUpload);
    var busboy = new Busboy({
      headers: req.headers
    });
    busboy.on('finish', function () {
      console.log('Upload finished');
      console.log(file);
      uploadToS3(file);
    });
    // req.pipe(busboy);
  });


  function uploadToS3(file) {
    // console.log(req.body);

    let folder = (req.user.username + "/")
    console.log("Folder name: " + folder);
    let params = {
      Bucket: bucketName,
      Key: folder,
      ACL: 'public-read',
      Body: file.data
    };

    s3.upload(params, function (err, data) {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log("Successfully created a folder on S3");
        console.log(data);
      }
    });
    // res.redirect("/feed");
  }
};