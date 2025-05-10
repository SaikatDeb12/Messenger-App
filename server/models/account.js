const { Schema, model } = require("mongoose");
const AccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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

module.exports = model("Account", AccountSchema);

// model Conversation{
//     id String @id @default(auto()) @map("_id") @db.objectId
//     createdAt DateTime @default(now())
//     lastMessageAt DateTime @default(now())
//     name String?
//     isGroup Boolean?
//     messagesIds String[] @db.ObjectId
//     messages Message[]
//     uesIds String[] @db.ObjectId
//     users User[] @relation(fields: [userIds], references: [id])
// }

// model Message{
//     id String @id @default(auto()) @map("_id") @db.objectId
//     body String?
//     image String?
//     createAt DateTime @default (now())
//     seenIds String[] @db.ObjectId
//     seen User[] @relation("Seen", fields: [seenIds]), references: [id])

//     conversationId String @db.ObjectId
//     conversation Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

//     sendeId String @db.Object4Id
//     sender User @relation(fields: [senderId], references: [id], onDelete: Cascade)
// }
