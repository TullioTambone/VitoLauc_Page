const db = require('../db');

exports.getTrash = () => {
  return db.execute('SELECT * FROM posts_trash ORDER BY deleted_at DESC');
};

exports.restorePost = async (trashId) => {
  const [rows] = await db.execute('SELECT * FROM posts_trash WHERE id = ?', [trashId]);
  if (rows.length === 0) return;

  const post = rows[0];
  await db.execute(
    `INSERT INTO posts (image_url, title, description, category_id) VALUES (?, ?, ?, ?)`,
    [post.image_url, post.title, post.description, post.category_id]
  );
  await db.execute('DELETE FROM posts_trash WHERE id = ?', [trashId]);
};

exports.permanentlyDeleteFromTrash = (id) => {
  return db.execute('DELETE FROM posts_trash WHERE id = ?', [id]);
};