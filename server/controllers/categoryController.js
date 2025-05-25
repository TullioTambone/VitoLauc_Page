const categoryModel = require('../models/categoryModel');

exports.getCategories = async (req, res) => {
  const [rows] = await categoryModel.getAllCategories();
  res.json(rows);
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  await categoryModel.createCategory(name);
  res.status(201).json({ message: 'Categoria creata' });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await categoryModel.deleteCategory(id);
  res.json({ message: 'Categoria eliminata' });
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await categoryModel.getCategoryById(id);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Categoria non trovata' });
  }
  res.json(rows[0]);
}

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const [existingCategory] = await categoryModel.getCategoryById(id);
  if (existingCategory.length === 0) {
    return res.status(404).json({ message: 'Categoria non trovata' });
  }

  await categoryModel.updateCategory(id, name);
  res.json({ message: 'Categoria aggiornata' });
}