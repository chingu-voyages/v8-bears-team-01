const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
                googleId: profile.id
            }).save();

            console.log(user);

            done(null, user);
        }
    )
);
