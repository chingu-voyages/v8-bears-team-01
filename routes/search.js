//const User = require("../models/user");
const Project = require("../models/Projects");

module.exports = app => {
  app.get("/api/search", (req, res) => {
    const searchQuery = req.query.q;
    const searchQueryRegex = new RegExp(searchQuery, 'i');

    Project.find().or([
          { 'projectName': { $regex: searchQueryRegex }},
          { 'description': { $regex: searchQueryRegex }},
      ]).sort('name').exec(function(err, data) {
          res.json({
            query: searchQuery,
            results: data
          });
      });  
  });
};
