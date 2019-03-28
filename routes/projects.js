const Project = require("../models/Projects");

module.exports = app => {
    app.get("/api/projects", async (req, res) => {
        const projects = await Project.find();

        res.json(projects);
    });

    app.post("/api/projects", async (req, res) => {
        const { name, deadline, description, roles, img } = req.body;

        const project = new Project({
            name,
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
