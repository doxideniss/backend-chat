import { UserModel } from "../models";

export default (req, res, next) => {
  req.user && UserModel.findByIdAndUpdate(
    req.user._id,
    { last_seen: new Date() },
    { new: true }
    ).exec();
  next()
}
