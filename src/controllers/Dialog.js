import { DialogModel } from "../models";

class DialogController {
  index(req, res) {
    const authorId = req.params.id;
    DialogModel.find({ author: authorId })
      .then((dialogs) => {
        res.json(dialogs)
      })
      .catch((err) => {
        res.status(404).json(err)
      })
  }

  create(req, res) {
    const postData = {
      author: req.body.author,
      partner: req.body.partner,
    };
    const dialog = new DialogModel(postData);
    dialog.save()
      .then((obj) => {
        res.json(obj);
      })
      .catch((err) => console.log(err))
  }
}

export default DialogController;
