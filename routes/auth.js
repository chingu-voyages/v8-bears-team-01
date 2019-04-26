const passport = require ('passport');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const User = require ('../models/User');
const verifyToken = require ('../middlewares/verifyToken');
const keys = require ('../config/keys');

module.exports = app => {
  app.get (
    '/auth/google',
    passport.authenticate ('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get (
    '/auth/google/callback',
    passport.authenticate ('google'),
    (req, res) => {
      let user = req.user;
      jwt.sign ({user}, keys.jwtSecret, (err, token) => {
        //console.log('google',req.user)
        req.session.token = token;
        req.session.user = req.user;
        res.redirect ('/auth');
      });
    }
  );

  app.get (
    '/auth/facebook',
    passport.authenticate ('facebook', {
      scope: ['email'],
    })
  );

  app.get (
    '/auth/facebook/callback',
    passport.authenticate ('facebook', {failureRedirect: '/failedLogin'}),
    (req, res) => {
      let user = req.user;
      jwt.sign ({user}, keys.jwtSecret, (err, token) => {
        req.session.token = token;
        req.session.user = req.user;

        if (process.env.NODE_ENV === 'production') {
          return res.redirect ('/auth');
        } else {
          res.redirect ('http://localhost:3000/auth');
        }
      });
    }
  );

  app.get ('/api/logout', verifyToken, (req, res) => {
    jwt.verify (req.token, keys.jwtSecret, (err, authData) => {
      if (err) {
        res.sendStatus (403);
      } else {
        delete req.user;
        delete req.session.user;
        delete req.session.token;
        res.json ({success: 'success'});
      }
    });

    //req.logout();
    // res.status(200).json({status:'success'})
    //res.redirect("/");
  });

  app.get ('/api/current_user', (req, res) => {
    res.send (req.session.user);
  });

  app.get ('/api/auth_token', (req, res) => {
    res.send (req.session.token);
  });

  app.post (`/auth/login`, (req, res) => {
    const {email, password} = req.body;

    //get password from db using email

    User.findOne ({email})
      .then (resp => {
        if (resp) {
          if (bcrypt.compareSync (password, resp.password)) {
            //save password in user details in req.user
            req.session.user = resp;
            // console.log("normal",resp)
            jwt.sign ({resp}, keys.jwtSecret, (err, token) => {
              res.status (200).json ({resp, token});
            });

            //redirect user to home page
          } else {
            //send back message if passwords don't match
            res.status (500).json ({errMessage: 'Wrong username or password'});
          }
        } else {
          res.status (404).json ({errMessage: 'email does not exist'});
        }
      })
      .catch (err =>
        res.status (404).json ({errMessage: 'something went wrong'})
      );
  });

  app.post (`/auth/signup`, (req, res) => {
    const {email, password, name} = req.body;

    //check if email exist
    User.findOne ({email: req.body.email})
      .then (resp => {
        if (resp) {
          return res.status (500).json ({errMessage: 'email already exists'});
        }
      })
      .catch (err =>
        res.status (500).json ({errMessage: 'something went wrong'})
      );

    //save the name,email and password in the db

    //this says how much salt is required
    let salt = bcrypt.genSaltSync (10);

    //this transforms the password into hash using the salt
    let hash = bcrypt.hashSync (password, salt);

    //save name,email and hash in db
    const newUser = new User ({
      name,
      email,
      password: hash,
    });
    newUser
      .save ()
      .then (resp => {
        jwt.sign ({resp}, keys.jwtSecret, (err, token) => {
          req.session.user = resp;
          req.session.token = token;

          res.status (200).json ({resp, token});
        });
      })
      .catch (err => {
        res.status (404).json (err);
      });

    //save user details in req.user
    //redirect user to `homepage`

    //if error resend
    //check if email add exist, if so, send error messaging saying email already exist

    //    .catch( err => {
    //     console.log(err.detail);
    //     let errMessage = err.detail;
    //     res.status(500).json({errMessage});
  });
};
