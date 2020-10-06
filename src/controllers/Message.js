import { MessageModel, DialogModel } from "../models";

export default (io) => {
  return {
    index(req, res) {
      const dialogId = req.query.dialogId;
      MessageModel.find({ dialog: dialogId })
        .populate(["user"])
        .then((messages) => {
          res.json(messages);
        })
        .catch((err) => {
          res.status(404).json(err);
        });
    },
    create(req, res) {
      const userId = req.user._id;
      const postData = {
        user: userId,
        dialog: req.body.dialog,
        text: req.body.text,
      };
      const message = new MessageModel(postData);
      message
        .save()
        .then((messageObj) => {
          message.populate("dialog", (err, data) => {
            if (err) {
              return res.status(400).json({
                message: err.message,
              });
            }
            DialogModel.findAndUpdate(
              {
                _id: postData.dialog,
              },
              {
                lastMessage: messageObj._id,
              }
            ).then(() => {
              res.json(messageObj);
              io.to(req.body.userTo).emit("NEW:MESSAGE", messageObj);
            }).catch((err) => {
              res.status(400).json({
                err
              })
            });
          });
        })
        .catch((err) => console.log(err));
    },
  };
};
