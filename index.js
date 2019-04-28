const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
const authRoute = require("./routes/auth");
const projectRoute = require("./routes/projects");
const searchRoute = require("./routes/search");
const imageRoute = require("./routes/image");
const messageRoute = require("./routes/messages");

require("./models/User");
require("./models/Projects");
require("./services/passport");

mongoose.connect(keys.mongoURI).catch(err => {
    console.log("error connecting to DB:", err);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoute(app);
projectRoute(app);
searchRoute(app);
imageRoute(app);
messageRoute(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("now running on port " + PORT);
});
