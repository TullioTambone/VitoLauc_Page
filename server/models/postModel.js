const db = require('../db');

exports.getAllPosts = () => {
  return db.execute(`SELECT * FROM posts ORDER BY created_at DESC`);
};

exports.getPostById = (id) => {
  return db.execute('SELECT * FROM posts WHERE id = ?', [id]);
};

exports.createPost = ({ image_url, title, description, category_id }) => {
  return db.execute(
    `INSERT INTO posts (image_url, title, description, category_id) VALUES (?, ?, ?, ?)`,
    [image_url, title || null, description || null, category_id || null]
  );
};

exports.updatePost = (id, { image_url, title, description, category_id }) => {
  return db.execute(
    `UPDATE posts SET image_url = ?, title = ?, description = ?, category_id = ? WHERE id = ?`,
    [image_url, title || null, description || null, category_id || null, id]
  );
}

exports.deletePost = async (id) => {
  const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
  if (rows.length === 0) return;

  const post = rows[0];
  await db.execute(
    `INSERT INTO posts_trash (image_url, title, description, category_id, original_id) VALUES (?, ?, ?, ?, ?)`,
    [post.image_url, post.title, post.description, post.category_id, post.id]
  );
  await db.execute('DELETE FROM posts WHERE id = ?', [id]);
};
