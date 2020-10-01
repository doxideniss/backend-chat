import { verifyJWToken } from '../utils';

export default (req, res, next) => {
  if (
    req.path === '/user/signin' ||
    req.path === '/user/signup' ||
    req.path === '/user/signup/verify'
  ) {
    return next();
  }

  const token = 'token' in req.headers ? req.headers.token : null;

  if (token) {
    verifyJWToken(token)
      .then((user) => {
        req.user = user.data._doc;
        next()
      })
      .catch((e) => {
        res.status(403).json({ massage: 'Invalid auth token' })
      })
  }
}
