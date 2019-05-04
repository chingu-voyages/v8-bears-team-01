const Project = require ('../models/Projects');
const verifyToken = require ('../middlewares/verifyToken');

module.exports = app => {
  //get all projects
  app.get ('/api/projects', async (req, res) => {
    try {
      const projects = await Project.find ().sort('-createdOn')
      //console.log(projects)
      res.json (projects);
    } catch (err) {
      // console.log("api error", err);
      res.status (422).send (err);
    }
  });

  //get a single project
  app.get ('/api/projects/:id', async (req, res, next) => {
    const project = await Project.findById (req.params.id);

    try {
      if (project) {
        res.status (200).json (project);
      } else {
        res.status (404).json ('No project found with this id');
      }
    } catch (err) {
      // console.log(err);
      res.status (404).json ({error: err});
    }
  });

  //create a project
  app.post ('/api/projects', async (req, res) => {
    const {
      projectType,
      ownerName,
      projectName,
      deadline,
      description,
      roles,
      imageUrl,
    } = req.body;

    //console.log (req.user);

    const project = new Project ({
      projectType,
      ownerName,
      projectName,
      deadline,
      description,
      roles,
      imageUrl,
      user: req.session.user._id,
      createdOn: new Date()
    });

    try {
      await project.save ();
      res.json (project);
    } catch (err) {
      res.status (422).send (err);
    }
  });

  //get projects that belong to a user

  app.get ('/api/user_projects', async (req, res) => {
    //console.log ('user details:', req.user);
    // console.log ('req.session.user', req.session.user);

    const projects = await Project.find ({user: req.session.user._id});

    try {
      res.json (projects);
    } catch (err) {
      res.json (err);
    }
  });

  //delete a project

  app.delete ('/api/projects/:id', async (req, res) => {
    await Project.findByIdAndRemove (req.params.id);

    try {
      res.status (200).json ({msg: 'successfully deleted project.'});
    } catch (err) {
      console.log ('ERROR: Unable to delete project. ', err);
      res.status (500).json ({error: err});
    }
  });

  //edit a project

  app.put ('/api/projects/:id', (req, res, next) => {
    Project.findByIdAndUpdate (req.params.id, req.body, {new: true})
      .then (data => {
        res.status (200).json (data);
      })
      .catch (err => {
        res.status (500).json ({
          message: err.message || 'some error occurred!',
        });
      });
  });
};
