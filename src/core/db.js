import mongoose from "mongoose";

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.xjojk.mongodb.net/chat?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) {
      throw Error(err);
    }
  }
);
