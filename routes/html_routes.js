// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var isMemed = require('../config/middleware/isMemed.js');
<<<<<<< HEAD
const db = require("../models");
=======
const AWS = require("aws-sdk");
const bucketName = 'socialmemedia';

>>>>>>> 8528627ca39b69c98fab977606a9aa64145e5c86

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads create.html
  app.get("/", function (req, res) {
    res.render(path.join(__dirname, "../views/index"), {
      title: "Social Memedia - Home"
    });
  });

  app.get("/register", function (req, res) {
    res.render(path.join(__dirname, "../views/register"), {
      title: "Social Memedia - Register"
    });
  });

   // post images to feed
  //  app.get("/feed", isMemed, function (req, res) {
  //   let params = {
  //     Bucket: "socialmemedia",
  //     MaxKeys: 100
  //   };
  //   s3.listObjectsV2(params, function(err, data) {
  //     if (err) console.log(err, err.stack);
  //     else console.log(data);
  //   });
  //   res.render(path.join(__dirname, "../views/feed"), {
  //     title: "Social Memedia - Feed",
  //     username: req.user.username,
  //     subscribers: req.user.subscribers,
  //     subscriptions: req.user.subscriptions,
  //     mpcount: req.user.mpcount,
  //     postcount: req.user.postcount
  //   });
    
  // });
  // ===================================================
  app.get("/feed", isMemed, function (req, res) {
    var memes = [];
    var params = {
     Bucket: "socialmemedia",
     MaxKeys: 100
    };
    s3.listObjectsV2(params, function (err, data) {
     if (err) console.log(err, err.stack);
     console.log(data);
     console.log(data.Contents[0]);
     var href = this.request.httpRequest.endpoint.href;
     
     var memeCount = data.Contents.length;
     for (var i in data.Contents) {
      var authorString = data.Contents[i].Key;
      var author = authorString.split("/");
      var bucketUrl = href + bucketName + '/';
      var meme = {
       postpicture: bucketUrl + data.Contents[i].Key,
       author: author[0],
       postcaption: "Captions don't exist just yet, but this is meme #" + i + " lol."
      };
      memes.push(meme);
      memeCount--;
      if (memeCount == 0) {
       res.render(path.join(__dirname, "../views/feed"), {
        title: "Social Memedia - Feed",
        username: req.user.username,
        subscribers: req.user.subscribers,
        subscriptions: req.user.subscriptions,
        mpcount: req.user.mpcount,
        postcount: req.user.postcount,
        memes: memes
       });
      }
     }
    });
   });

  // cms route loads feed.html
  app.get("/login", function (req, res) {
    res.render(path.join(__dirname, "../views/login"), {
      title: "Social Memedia - Login"
    });
  });

  app.get("/create", function (req, res) {
    res.render(path.join(__dirname, "../views/create"), {
      title: "Social Memedia - Create Meme"
    });
  });

  app.get("/profile/:username", function (req, res) {
    db.profile.findOne({
      username: req.params.username
    }).then(function (data) {
      res.render(path.join(__dirname, "../views/profile"), {
        title: "Social Memedia - " + req.params.username + "'s Profile",
        posts: data.posts,
        memepoints: data.memepoints,
        postcount: data.postcount,
        username: req.params.username
      })
    });
  });

  // // blog route loads index.html
  // app.get("/index", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../view/index.html"));
  // });

  // app.get("/relog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/relog.html"));
  // });

};