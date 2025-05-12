import mongoose from "mongoose";
const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
  },
  provider: {
    type: String,
  },
  providerAccountId: {
    type: String,
  },
  refresh_token: {
    type: String,
    default: null,
  },
  access_token: {
    type: String,
    default: null,
  },
  expires_at: {
    type: Number,
    default: null,
  },
  token_type: {
    type: String,
    default: null,
  },
  scope: {
    type: String,
    default: null,
  },
  id_token: {
    type: String,
    default: null,
  },
  session_state: {
    type: String,
    default: null,
  },
});

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const AccountModel = mongoose.model("accounts", AccountSchema);
export default AccountModel;
