const db = require('../db');

exports.getAllPhotos = () => {
  return db.execute(`SELECT * FROM photos ORDER BY ID DESC`);
};

exports.getPhotoById = (id) => {
  return db.execute('SELECT * FROM photos WHERE id = ?', [id]);
};

exports.createPhoto = ({ image_url, title, description, category_id }) => {
  return db.execute(
    `INSERT INTO photos (image_url, title, description, category_id) VALUES (?, ?, ?, ?)`,
    [image_url, title || null, description || null, category_id || null]
  );
};

exports.updatePhoto = (id, { image_url, title, description, category_id }) => {
  return db.execute(
    `UPDATE photos SET image_url = ?, title = ?, description = ?, category_id = ? WHERE id = ?`,
    [image_url, title || null, description || null, category_id || null, id]
  );
}

exports.deletePhoto = (id) => {
  const [rows] = db.execute('SELECT * FROM photos WHERE id = ?', [id]);
  if (rows.length === 0) return;
  db.execute('DELETE FROM photos WHERE id = ?', [id]);
};
