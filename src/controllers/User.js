import { UserModel } from "../models";
import { createJWToken } from "../utils";
import { validationResult } from "express-validator";
import { compareSync } from "bcrypt";

export default (io) => {
  return {
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
    },
    getMe(req, res) {
      const id = req.user._id;
      UserModel.findById(id)
        .then((user) => {
          res.json(user)
        })
        .catch(() => {
          res.status(404).json({
            message: 'Not found'
          })
        })
    },
    create(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const postData = {
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
      };

      UserModel.findOne({ email: postData.email })
        .then(() => {
          res.status(400).json({
            message: 'This email is already registered'
          })
        })
        .catch(() => {
          const user = new UserModel(postData);
          user.save()
            .then((obj) => {
              res.json(obj);
            })
            .catch((err) => res.json(err))
        });
    },
    login(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const postData = {
        email: req.body.email,
        password: req.body.password,
      };

      UserModel.findOne({
        email: postData.email
      })
        .then((user) => {
          if (compareSync(postData.password, user.password)) {
            const token = createJWToken(user);
            res.json({
              token
            })
          } else {
            res.json({
              message: 'Incorrect email or password'
            });
          }

        })
        .catch((err) => {
          res.status(404).json({
            message: 'User not found',
            err
          });
        });
    },
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
};
