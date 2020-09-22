import { Router } from 'express';
import { loginValidation, registerValidation } from "../utils/validations";
import { userController } from "../controllers";

export default (io) => {
  const UserCtrl = userController(io);
  const router = Router();

  router.get('/:id', UserCtrl.show);
  router.get('/me', UserCtrl.getMe);
  router.post('/signup', registerValidation, UserCtrl.create);
  router.post('/signin', loginValidation, UserCtrl.login);
  router.delete('/:id', UserCtrl.delete);

  return router;
};
