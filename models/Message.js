const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    messageBody: String,
    role: String,
    sender: { type: Schema.Types.ObjectId, ref: "user" },
    recipient: { type: Schema.Types.ObjectId, ref: "user" },
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
