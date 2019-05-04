const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    projectType: Object,
    ownerName: String,
    projectName: String,
    deadline: String,
    description: String,
    roles: [String],
    user: { type: Schema.Types.ObjectId, ref: "user" },
    imageUrl: String,
    createdOn: Date
});

const Project = mongoose.model("projects", projectSchema);

module.exports = Project;
