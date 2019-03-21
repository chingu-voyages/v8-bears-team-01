const passport = require("passport");
const bcrypt = require('bcryptjs');


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

    app.post(`/auth/login`,(req,res)=>{
        const { email, password } = req.body
    /*
        //get password from db using email
        
        //compare password from db with password from client
        if(bcrypt.compareSync(password,dbPassword)){
            //save password in user details in req.user
            
            //redirect user to home page
            // res.redirect('http://localhost:5000/')

        } else {
           
                //send back message if passwords don't match
                res.status(500).json({errMessage: 'Wrong username or password'})
        }

        */
    })

    app.post(`/auth/signup`,(req,res)=>{
        const { email, password, name } = req.body

        //save the name,email and password in the db
       
        //this says how much salt is required
        let salt = bcrypt.genSaltSync(10) 

        //this transforms the password into hash
       let hash = bcrypt.hashSync(password,salt)

       //save name,email and hash in db

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
