import { Schema, model } from "mongoose";

const DialogSchema = new Schema({
  partner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  },
}, {
  timestamps: true
});

const Dialog = model('Dialog', DialogSchema);

export default Dialog;
