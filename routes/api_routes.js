const db = require("../models");
const passport = require("../config/passport");

// ===============================================
const AWS = require("aws-sdk");
const Busboy = require('busboy');
const bucketName = 'socialmemedia';
const bucketRegion = 'us-east-1';
AWS.config.update({
  region: bucketRegion
});
AWS.config.apiVersions = {
  s3: '2006-03-01',
};
const s3 = new AWS.S3();
// ==============================================


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
    const folder = (req.user.username + "/");
    const file = (req.body.imageUpload);
    const params = {
      Bucket: bucketName,
      Key: (folder + file),
      ACL: 'public-read',
      Body: file
    };
    console.log("Folder name: " + folder);
    console.log("File: " + file);
    
    // uploads image in folder in bucket
    s3.putObject(params, function (err, data) {
      if (err) {
        console.log("Error: ", err);
      } else {
        console.log(data);
      }
    });
    res.redirect("/feed");
  });
}
