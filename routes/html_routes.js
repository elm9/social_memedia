// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads create.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create.html"));
  });

  // cms route loads feed.html
  app.get("/feed", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/feed.html"));
  });

  // blog route loads index.html
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/relog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/relog.html"));
  });

};
