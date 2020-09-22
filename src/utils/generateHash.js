import bcrypt from 'bcrypt';

export default (text) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, 10, function (err, hash) {
      if (err) return reject(err);

      resolve(hash);
    });
  });
}
