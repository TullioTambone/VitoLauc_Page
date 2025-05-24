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
