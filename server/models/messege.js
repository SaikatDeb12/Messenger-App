const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  body: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seenIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
