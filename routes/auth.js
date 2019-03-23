const passport = require("passport");
const bcrypt = require('bcryptjs');
const User = require('../models/User')


module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/");
        }
    );

    app.get(
      "/auth/facebook", 
      passport.authenticate("facebook", {
        scope: ["email"]
      })
    );

    app.get(
      "/auth/facebook/callback", 
      passport.authenticate("facebook", { failureRedirect: "/failedLogin" }),
      (req, res) => {
        if (process.env.NODE_ENV === "production") {
          return res.redirect("/");
        } else {
          return res.redirect("http://localhost:3000"); 
        }
      }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });

    app.post(`/auth/login`, (req,res)=>{
        const { email, password } = req.body
    
        //get password from db using email

         User.findOne({ email })
             .then(resp=>{
                 
                if(resp){

                    if(bcrypt.compareSync(password,resp.password)){
                        //save password in user details in req.user
                        req.user = resp
                       
                       res.status(200).json(resp)
          
                        //redirect user to home page
                       
            
                    } else {
                       
                            //send back message if passwords don't match
                            res.status(500).json({errMessage: 'Wrong username or password'})
                    }
                    
                } else {
                    res.status(404).json({errMessage: 'email does not exist'})
                }
             })
             .catch(err=> res.status(404).json({errMessage: 'something went wrong'}))

    })

    app.post(`/auth/signup`,(req,res)=>{
        const { email, password, name } = req.body

        //check if email exist
        User.findOne({ email: req.body.email })
            .then(resp=>{
                if(resp){
                  return res.status(500).json({errMessage:'email already exists'})
                }
            })
             .catch(err=>res.status(500).json({errMessage: 'something went wrong'}))

        //save the name,email and password in the db

       
        //this says how much salt is required
        let salt = bcrypt.genSaltSync(10) 

        //this transforms the password into hash using the salt
       let hash = bcrypt.hashSync(password,salt)
       
       //save name,email and hash in db
       const newUser = new User({
        name,
        email,
        password: hash
    });
             newUser.save()
                    .then(resp=>{
                        req.user = resp
                        res.status(200).json(resp)
                       
                    })
                    .catch(err=>{
                        res.status(404).json(err)
                    })

       //save user details in req.user
       //redirect user to homepage


       //if error resend
       //check if email add exist, if so, send error messaging saying email already exist

    //    .catch( err => {
    //     console.log(err.detail);
    //     let errMessage = err.detail;
    //     res.status(500).json({errMessage});

      



    })
};
