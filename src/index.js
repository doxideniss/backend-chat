import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import './core/db';
import createSocket from './core/socket';
import { checkAuth, updateLastSeen } from "./middleware";
import { UserRoute, DialogRoute, MessageRoute } from "./routers";

const app = express();
const http = createServer(app);
const io = createSocket(http);

app.use(bodyParser.json());
app.use(cors());
app.use(updateLastSeen);
app.use(checkAuth);

app.use('/user', UserRoute(io));
app.use('/dialogs', DialogRoute(io));
app.use('/messages', MessageRoute(io));

const PORT = process.env.PORT ? Number(process.env.PORT) : '9999';

http.listen(PORT, () => {
  console.log(`Server started on port - ${PORT}!`)
});
