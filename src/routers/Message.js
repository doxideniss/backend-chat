import { Router } from 'express';
import { messageController } from "../controllers";

export default (io) => {
  const MessageCtrl = messageController(io);
  const router = Router();

  router.get('/', MessageCtrl.index);
  router.post('/', MessageCtrl.create);

  return router
};
