const db = require('../db');

exports.findByUsername = (username) => {
  return db.execute('SELECT * FROM users WHERE username = ?', [username])
    .then(([rows]) => rows)
    .catch(err => {
      throw err;
    });
};
