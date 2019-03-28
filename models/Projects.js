const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: String,
    deadline: String,
    description: String,
    roles: String,
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    img: String
});

const Project = mongoose.model("projects", projectSchema);

module.exports = Project;
