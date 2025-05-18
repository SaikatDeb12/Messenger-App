import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  githubId?: string;
  googleId?: string;
  name?: string;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    default: null,
  },
  emailVerified: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  hashedPassword: {
    type: String,
    default: null,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  conversationIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
  seenMessageIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],

  accounts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const userId = this._id;
    await model("Account").deleteMany({ userId });
    next();
  }
);

const UserModel = model("users", UserSchema);

export default UserModel;
