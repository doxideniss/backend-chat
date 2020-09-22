import { DialogModel, MessageModel } from "../models";

export default (io) => {
  return {
    index(req, res) {
      const userId = req.user._id;
      DialogModel.find()
        .or([{ author: userId }, { partner: userId }])
        .populate(['author', 'partner'])
        .populate({
          path: 'lastMessage',
          populate: {
            path: 'user',
          },
        })
        .then((dialogs) => {
          res.json(dialogs)
        })
        .catch((err) => {
          res.status(404).json(err)
        })
    },
    create(req, res) {
      const postData = {
        author: req.body.author,
        text: req.body.text,
        partner: req.body.partner,
      };
      const dialog = new DialogModel(postData);
      dialog.save()
        .then((dialogObj) => {
          const message = new MessageModel({
            text: postData.text,
            user: postData.author,
            dialog: dialogObj._id
          });
          message.save()
            .then(() => {
              dialogObj.lastMessage = message._id;
              dialogObj.save().then(() => {
                res.json(dialogObj);
              });
            })
            .catch((err) => {
              res.json(err)
            });
        })
        .catch((err) => console.log(err))
    },
    delete(req, res) {
      const { id } = req.params;
      DialogModel.findByIdAndDelete(id)
        .then(() => {
          res.json({
            message: `Dialog deleted`
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
