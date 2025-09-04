const photoModel = require('../models/PhotoModel');

exports.getPhotos = async (req, res) => {
  const [rows] = await photoModel.getAllPhotos();
  res.json(rows);
};

exports.createPhotos = async (req, res) => {
  const { image_url, title, description, category_id } = req.body;
  await photoModel.createPhoto({ image_url, title, description, category_id });
  res.status(201).json({ message: 'Photo creato' });
};

exports.updatePhotos = async (req, res) => {
  const { image_url, title, description, category_id } = req.body;
  await photoModel.updatePhoto(req.params.id, { image_url, title, description, category_id });
  res.json({ message: 'Photo aggiornato' });
};

exports.deletePhotos = async (req, res) => {
  await photoModel.deletePhoto(req.params.id);
  res.json({ message: 'Photo spostato nel cestino' });
};
