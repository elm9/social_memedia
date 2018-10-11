// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("./config/passport");
var bodyParser = require("body-parser");
var session = require("express-session");

// Sets up the PORT
// =============================================================
// var PORT = process.env.PORT || 8080;

// Requiring our models for syncing

var db = require("./models");
//Set up the Express App
var app = express();


// sets up AWS s3 and console.log bucket
// =============================================================
//Requiring our AWS S-3
const AWS = require("aws-sdk");
// const S3_BUCKET = process.env.S3_BUCKET;

// // var credentials = new AWS.SharedIniFileCredentials({
// //   profile: 'default'
// // });
// // AWS.config.credentials = credentials;
// // Set the region 
// AWS.config.update({
//   region: 'us-east-1'
// });
// // Create S3 service object
// s3 = new AWS.S3({
//   apiVersion: '2006-03-01'
// });
// // Call S3 to list current buckets
// s3.listBuckets(function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Bucket List", data.Buckets);
//   }
// });
// =============================================================

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Static directory
app.use(express.static("public"));
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.set('views', __dirname + '/views');

// Routes
// =============================================================
// require("./routes/post-api-routes.js")(app);
require("./routes/api_routes.js")(app);
require("./routes/html_routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(process.env.PORT || 8080, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});