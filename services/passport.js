const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const keys = require("../config/keys");

const User = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true,
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
        },
        async (accessToken, refreshToken, profile, done) => {
            
            const existingUser = await User.findOne({
                googleId: profile.id
            });

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                picture: profile.photos[0].value,
                password: "password"
            }).save();


            done(null, user);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: keys.facebookCallbackURL,
            profileFields: ["emails", "name", "picture.type(large)"]
        },
        (accessToken, refreshToken, profile, done) => {
           
            process.nextTick(() => {
                User.findOne({ profileID: profile.id }, (err, user) => {
                    if (err) return done(err);
                    if (user) return done(null, user);
                    else {
                       
                        const profileInfo = {
                            fbID: profile.id,
                            name: profile.name.givenName,
                            email: profile.emails[0].value,
                            picture: profile.photos[0].value,
                            password: "password"
                        };
                        const newUser = new User(profileInfo);

                        newUser.save(err => {
                            if (err) throw err;
                            else return done(null, newUser);
                        });
                    }
                });
            });
        }
    )
);
