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
    res.sendFile(path.join(__dirname, "../views/create.handlebars"));
  });

  // // cms route loads feed.html
  // app.get("/feed", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../view/feed.html"));
  // });

  // // blog route loads index.html
  // app.get("/index", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../view/index.html"));
  // });

  // app.get("/relog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/relog.html"));
  // });

};
