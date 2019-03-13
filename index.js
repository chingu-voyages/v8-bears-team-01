const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ doesitwork: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
