const Project = require("../models/Projects");

module.exports = app => {

    //get all projects
    app.get("/api/projects", async (req, res) => {
        try {
          const projects = await Project.find();
          res.json(projects);
      } catch (err) {
          console.log( 'api error', err);
          res.status(422).send(err);
      }
    });

    //create a project
    app.post("/api/projects", async (req, res) => {
        const {
            ownerName,
            projectName,
            deadline,
            description,
            roles,
            img
        } = req.body;

        const project = new Project({
            ownerName,
            projectName,
            deadline,
            description,
            roles,
            img
            // _user: req.user.id
        });

        try {
            await project.save();
            res.json(project);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    //get a single project 
    app.get("/api/projects/:projectId", (req, res, next) => {
      Project.findById(req.params.projectId)
        .then(project => {
          if (project) {
            res.status(200).json(project);
          } else {
            res.status(404).json("No project found with this id");
          }
        })
        .catch(err => {
          console.log(err);
          res.status(404).json({ error: err });
        });
    });
};
