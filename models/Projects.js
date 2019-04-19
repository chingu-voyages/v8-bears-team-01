const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    projectType: Object,
    ownerName: String,
    projectName: String,
    deadline: String,
    description: String,
    roles: [String],
    _user: { type: Schema.Types.ObjectId, ref: "User" },
    imageUrl: String
});

const Project = mongoose.model("projects", projectSchema);

module.exports = Project;
