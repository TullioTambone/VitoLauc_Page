const trashModel = require('../models/trashModel');


exports.getTrash = async (req, res) => {
  const [rows] = await trashModel.getTrash();
  res.json(rows);
};

exports.restorePost = async (req, res) => {
  await trashModel.restorePost(req.params.id);
  res.json({ message: 'Post ripristinato' });
};

exports.permanentlyDelete = async (req, res) => {
  await trashModel.permanentlyDeleteFromTrash(req.params.id);
  res.json({ message: 'Post eliminato definitivamente' });
};