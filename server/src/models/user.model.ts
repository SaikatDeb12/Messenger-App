import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  hashedPassword?: string;
  name?: string;
  emailVerified?: Date;
  image?: string;
  createAt: Date;
  updatedAt: Date;
  conversationIds: Schema.Types.ObjectId[];
  seenMessageIds: Schema.Types.ObjectId[];
  accounts: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
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

const UserModel = model<IUser>("users", UserSchema);

export default UserModel;
