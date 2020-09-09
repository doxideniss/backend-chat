import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

import { UserController, DialogController } from './controllers';

mongoose.connect('mongodb+srv://doxi:Wolf5den@cluster0.xjojk.mongodb.net/chat?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(cors());

const User = new UserController();
const Dialog = new DialogController();

app.get('/user/:id', User.show);
app.post('/user/registration', User.create);
app.delete('/user/:id', User.delete);

app.get('/dialog/:id', Dialog.index);
app.post('/dialog', Dialog.create);

app.listen(9999, () => {
  console.log('Server started on port - 9999!')
});
