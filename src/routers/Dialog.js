import { Router } from 'express';
import { dialogController } from "../controllers";

export default (io) => {
  const DialogCtrl = dialogController(io);
  const router = Router();

  router.get('/', DialogCtrl.index);
  router.post('/', DialogCtrl.create);
  router.delete('//:id', DialogCtrl.delete);

  return router;
};
