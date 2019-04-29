const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    messageBody: String,
    role: String,
    senderId: { type: Schema.Types.ObjectId, ref: "user" },
    recipientId: { type: Schema.Types.ObjectId, ref: "user" }
});

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
