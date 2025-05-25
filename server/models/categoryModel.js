const db = require('../db');

exports.getAllCategories = () => {
  return db.execute('SELECT * FROM categories ORDER BY name ASC');
};

exports.createCategory = (name) => {
  return db.execute('INSERT INTO categories (name) VALUES (?)', [name]);
};

exports.deleteCategory = (id) => {
  return db.execute('DELETE FROM categories WHERE id = ?', [id]);
};

exports.getCategoryById = (id) => {
  return db.execute('SELECT * FROM categories WHERE id = ?', [id]);
}

exports.updateCategory = (id, name) => {
  return db.execute('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
};