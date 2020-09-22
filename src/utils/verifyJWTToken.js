import jwt from 'jsonwebtoken';

export default token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        reject(err)
      }
      resolve(decodedToken);
    })
  });
};

