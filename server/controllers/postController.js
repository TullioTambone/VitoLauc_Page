const postModel = require('../models/postModel');

exports.getPosts = async (req, res) => {
  const [rows] = await postModel.getAllPosts();
  res.json(rows);
};

exports.createPost = async (req, res) => {
  const { image_url, title, description, category_id } = req.body;
  await postModel.createPost({ image_url, title, description, category_id });
  res.status(201).json({ message: 'Post creato' });
};

exports.deletePost = async (req, res) => {
  await postModel.deletePost(req.params.id);
  res.json({ message: 'Post spostato nel cestino' });
};

exports.getTrash = async (req, res) => {
  const [rows] = await postModel.getTrash();
  res.json(rows);
};

exports.restorePost = async (req, res) => {
  await postModel.restorePost(req.params.id);
  res.json({ message: 'Post ripristinato' });
};

exports.permanentlyDelete = async (req, res) => {
  await postModel.permanentlyDeleteFromTrash(req.params.id);
  res.json({ message: 'Post eliminato definitivamente' });
};
