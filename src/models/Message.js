import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  dialog: {
    type: Schema.Types.ObjectId,
    ref: 'Dialog',
    require: true
  },
  text: {
    type: String,
    require: true
  },
  unread: {
    type: Boolean,
    default: false
  },
  attachments: [{
    type: Schema.Types.ObjectId,
    ref: 'UploadFile'
  }]
}, {
  timestamps: true,
  usePushEach: true,
});

const Message = model('Message', MessageSchema);

export default Message;
