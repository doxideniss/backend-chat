import { UserModel } from "../models";

class UserController {
  show(req, res) {
    const { id } = req.params;
    UserModel.findById(id)
      .then((user) => {
        res.json(user)
      })
      .catch(() => {
        res.status(404).json({
          message: 'Not found'
        })
      })
  }

  getMe() {

  }

  create(req, res) {
    const postData = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: req.body.password,
    };
    const user = new UserModel(postData);
    user.save()
      .then((obj) => {
        res.json(obj);
      })
      .catch((err) => console.log(err))
  }

  delete(req, res) {
    const { id } = req.params;
    UserModel.findByIdAndDelete(id)
      .then((user) => {
        res.json({
          message: `User ${user.fullName} deleted`
        })
      })
      .catch(() => {
        res.status(404).json({
          message: 'Not found'
        })
      })
  }
}

export default UserController;
