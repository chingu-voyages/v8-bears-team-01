const Project = require("../models/Projects");

module.exports = app => {
    app.get("/api/projects", async (req, res) => {
        try {
          const projects = await Project.find();
          res.json(projects);
      } catch (err) {
          console.log( 'api error', err);
          res.status(422).send(err);
      }
    });

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
};
