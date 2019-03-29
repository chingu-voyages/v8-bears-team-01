//const User = require("../models/user");
const Project = require("../models/Projects");

module.exports = app => {
  app.get("/search", (req, res) => {
    const searchQuery = new RegExp(req.query.q);
    
  Project.find().or([
        { 'name': { $regex: searchQuery }},
        { 'description': { $regex: searchQuery }},
    ]).sort('name').exec(function(err, data) {
        res.json(data);
    });  
  });
};
