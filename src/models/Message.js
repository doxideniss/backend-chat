import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  author: String,
  partner: String,
  dialog: String,
  text: String,
  unread: Boolean
}, {
  timestamps: true
});

const Message = model('Message', MessageSchema);

export default Message;
