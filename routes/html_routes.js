// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var isMemed = require('../config/middleware/isMemed.js');

// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads create.html
  app.get("/", function(req, res) {
    res.render(path.join(__dirname, "../views/index"), { title: "Social Memedia - Home" });
  });

  app.get("/register", function(req, res) {
    res.render(path.join(__dirname, "../views/register"), { title: "Social Memedia - Register" });
  });

  // cms route loads feed.html
  app.get("/feed", isMemed, function(req, res) {
    res.render(path.join(__dirname, "../views/feed"), { title: "Social Memedia - Feed" });
  });

    // cms route loads feed.html
    app.get("/login", function(req, res) {
      res.render(path.join(__dirname, "../views/login"), { title: "Social Memedia - Login" });
    });

  // // blog route loads index.html
  // app.get("/index", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../view/index.html"));
  // });

  // app.get("/relog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/relog.html"));
  // });

};