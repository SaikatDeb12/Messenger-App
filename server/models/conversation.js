const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    default: null,
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  messageIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  userIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Optional: Indexes for performance
ConversationSchema.index({ userIds: 1 });

module.exports = mongoose.model("Conversation", ConversationSchema);
