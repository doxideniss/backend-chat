import { isEmail } from "validator";
import { Schema, model } from "mongoose";
import { generateHash } from "../utils";

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
  last_seen: {
    type: Date,
    default: new Date()
  }
}, {
  timestamps: true
});

UserSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  user.password = await generateHash(user.password);
  user.confirm_hash = await generateHash(new Date().toString());
});

const User = model('User', UserSchema);

export default User;
