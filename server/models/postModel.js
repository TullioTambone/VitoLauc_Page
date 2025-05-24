const db = require('../db');

exports.createPost = ({ image_url, title, description, category_id }) => {
  return db.execute(
    `INSERT INTO posts (image_url, title, description, category_id) VALUES (?, ?, ?, ?)`,
    [image_url, title || null, description || null, category_id || null]
  );
};

exports.getAllPosts = () => {
  return db.execute(`SELECT * FROM posts ORDER BY created_at DESC`);
};

exports.deletePost = async (id) => {
  // sposta il post in trash
  const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
  if (rows.length === 0) return;

  const post = rows[0];
  await db.execute(
    `INSERT INTO posts_trash (image_url, title, description, category_id, original_id) VALUES (?, ?, ?, ?, ?)`,
    [post.image_url, post.title, post.description, post.category_id, post.id]
  );
  await db.execute('DELETE FROM posts WHERE id = ?', [id]);
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

exports.getTrash = () => {
  return db.execute('SELECT * FROM posts_trash ORDER BY deleted_at DESC');
};

exports.permanentlyDeleteFromTrash = (id) => {
  return db.execute('DELETE FROM posts_trash WHERE id = ?', [id]);
};
