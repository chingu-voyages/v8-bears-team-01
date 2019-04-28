const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    messageBody: String,
    roles: [String],
    sender: { type: Schema.Types.ObjectId, ref: "user" },
    recepient: { type: Schema.Types.ObjectId, ref: "user" }
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
