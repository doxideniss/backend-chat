import { isEmail } from "validator";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Email address is required',
    validate: [isEmail, 'Please fill a valid email address'],
  },
  fullName: {
    type: String,
    required: 'Full name is required'
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  avatar: String,
  confirm_hash: String,
  last_seen: Date
}, {
  timestamps: true
});

const User = model('User', UserSchema);

export default User;
