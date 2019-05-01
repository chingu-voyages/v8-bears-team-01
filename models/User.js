const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    fbID: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    job_title:{
        type: String,
        required: false
    },
    location:{
        type: String,
        required: false
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
