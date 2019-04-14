const Project = require("../models/Projects");
const verifyToken = require("../middlewares/verifyToken")


module.exports = app => {
    //get all projects
    app.get("/api/projects", async (req, res) => {
        try {
            const projects = await Project.find();
            res.json(projects);
        } catch (err) {
           // console.log("api error", err);
            res.status(422).send(err);
        }
    });

    //get a single project
    app.get("/api/projects/:id", async (req, res, next) => {
        const project = await Project.findById(req.params.id);

        try {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json("No project found with this id");
            }
        } catch (err) {
           // console.log(err);
            res.status(404).json({ error: err });
        }
    });

    //create a project
    app.post("/api/projects", async (req, res) => {
        const {
            projectType,
            ownerName,
            projectName,
            deadline,
            description,
            roles,
            img
        } = req.body;

        const project = new Project({
            projectType,
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

    //get projects that belong to a user

    app.get("/api/:userID/projects", verifyToken ,async (req, res) =>{

        //get the current logged in user from the session.
        const user_id = req.params.userID

        //get all project that logged in user has
      
        //send user's project to client
        //res.status(200).json(user)
    })

      //delete a project

      app.delete("/api/projects/:id", function(req, res) {
        Project.findByIdAndRemove(req.params.id, function(err) {
          if (err) {
            console.log("ERROR: Unable to delete project. ", err);
            res.status(500).json({ error: err });
          } else {
            res.status(200).json({ msg: "successfully deleted project." });
          }
        });
      });

      //edit a project

      app.put("/api/projects/:id", (req, res, next) => {
        Project.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
          .then(data => {
            res.status(200).json(data);
          })
          .catch(err => {
            res.status(500).json({ message: err.message || "some error occurred!" });
          });
      });
      
};
