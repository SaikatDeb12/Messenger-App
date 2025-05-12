import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  userIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

ConversationSchema.index({ userIds: 1 });

const ConversationModel = mongoose.model("conversations", ConversationSchema);

export default ConversationModel;
