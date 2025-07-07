import { Schema, model, Types } from "mongoose";

export interface UserType extends Document {
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
  conversationsId: Types.ObjectId[];
  seenMessagesId: Types.ObjectId[];
}

const UserSchema = new Schema<UserType>(
  {
    name: { type: String },
    email: { type: String, unique: true },
    emailVerified: { type: Boolean },
    image: { type: String },
    hashedPassword: { type: String },
    conversationsId: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
    seenMessagesId: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

export const UserModel = model<UserType>("User", UserSchema);
