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
          res.status(400).json({
            message: 'Not found'
          })
        })
    },
    getMe(req, res) {
      const id = req.user && req.user._id;
      UserModel.findById(id, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            status: 'error',
            message: "Пользователь не найден",
          });
        }
        res.json(user);
      });
    },
    create(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const postData = {
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password
      };

      UserModel.findOne({ email: postData.email })
        .then((findUser) => {
          if (!findUser) {
            const user = new UserModel(postData);
            return user.save()
              .then((obj) => {
                res.json(obj);
              })
              .catch((err) => res.json(err));
          }
          res.status(400).json({
            status: 'error',
            message: 'Этот E-mail уже зарегистрирован'
          })
        })
    },
    verify(req, res) {
      const hash = req.query.hash;
      if (!hash) {
        res.status(400).json({
          status: 'error',
          message: 'Нету хеш ключа'
        })
      }
      UserModel.findOne({ confirm_hash: hash }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            status: 'error',
            message: "Хеш ключ недействителен",
          });
        }
        if (user.confirmed) {
          return res.status(400).json({
            status: 'error',
            message: "Этот аккаунт уже подтвержден!",
          });
        }
        user.confirmed = true;
        user.save((err) => {
          if (err) {
            return res.status(400).json({
              status: "error",
              message: err,
            });
          }

          res.json({
            status: "success",
            message: "Аккаунт успешно подтвержден!",
          });
        });
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
      }, (err, user) => {
        const comparePass = !!user && compareSync(postData.password, user.password);
        if (err || !comparePass) {
          res.status(400).json({
            status: 'error',
            message: 'Неверный адрес электронной почты или пароль'
          });
        } else if (comparePass) {
          const token = createJWToken(user);
          delete user._doc.password;
          res.json({
            ...user._doc,
            status: 'success',
            token
          })
        }
      })
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
          res.status(400).json({
            status: 'error',
            message: "Пользователь не найден",
          });
        })
    }
  }
};
