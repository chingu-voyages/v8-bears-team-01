//const User = require("../models/user");
const Project = require("../models/Projects");

module.exports = app => {
  app.get("/search", (req, res) => {
    console.log("Search term: " + req.query.q);
  //   const searchQuery = new RegExp(req.query.q, 'i');

  //   Project.find().or([
  //       { 'name': { $regex: searchQuery }},
  //       { 'description': { $regex: searchQuery }},
  //   ]).sort('name').exec(function(err, data) {
  //       res.render("projects/search", {config: config, term: req.query.term, projects: data});
  //   });  
  });
};
