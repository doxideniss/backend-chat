import { UserModel } from "../models";

export default (req, res, next) => {
  const userId = '5f5915944814d137c06f8ef0';
  UserModel.findByIdAndUpdate(
    userId,
    { last_seen: new Date() },
    { new: true }
    ).exec();
  next()
}
