import { MessageModel } from "../models";

export default (io) => {
  return {
    index(req, res) {
      const dialogId = req.query.dialogId;
      MessageModel.find({ dialog: dialogId })
        .populate(['user'])
        .then((messages) => {
          res.json(messages)
        })
        .catch((err) => {
          res.status(404).json(err)
        })
    },
    create(req, res) {
      const userId = req.user._id;
      const postData = {
        user: userId,
        dialog: req.body.dialog,
        text: req.body.text,
      };
      const message = new MessageModel(postData);
      message.save()
        .then((obj) => {
          console.log(obj)
          message.populate('dialog', (err, data) => {

            console.log(data)
            res.json(obj);
            io.emit('NEW:MESSAGE', obj)
          })
        })
        .catch((err) => console.log(err))
    }
  }
};
