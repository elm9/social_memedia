var db = require("../models");

module.exports = function(app) {
  // Find all memes and return them to the user with res.json
  app.get("/api/authors", function(req, res) {
    db.memedia.findAll({}).then(function(dbmemedia) {
      res.json(dbmemedia);
    });
  });

  app.get("/api/index/:id", function(req, res) {
    // Find one Author with the id in req.params.id and return them to the user with res.json
    db.memedia.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbmemedia) {
      res.json(dbmemedia);
    });
  });

  app.post("/api/authors", function(req, res) {
    // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.Author.create(req.body).then(function(dbmemedia) {
      res.json(dbmemedia);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.memedia.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbmemedia) {
      res.json(dbmemedia);
    });
  });

};