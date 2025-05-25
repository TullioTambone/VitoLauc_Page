const postModel = require('../models/postModel');

exports.getPosts = async (req, res) => {
  const [rows] = await postModel.getAllPosts();
  res.json(rows);
};

exports.getPostById = async (req, res) => {
  const [rows] = await postModel.getPostById(req.params.id);
  if (rows.length === 0) {
    return res.status(404).json({ message: 'Post non trovato' });
  }
  res.json(rows[0]);
};

exports.createPost = async (req, res) => {
  const { image_url, title, description, category_id } = req.body;
  await postModel.createPost({ image_url, title, description, category_id });
  res.status(201).json({ message: 'Post creato' });
};

exports.updatePost = async (req, res) => {
  const { image_url, title, description, category_id } = req.body;
  await postModel.updatePost(req.params.id, { image_url, title, description, category_id });
  res.json({ message: 'Post aggiornato' });
};

exports.deletePost = async (req, res) => {
  await postModel.deletePost(req.params.id);
  res.json({ message: 'Post spostato nel cestino' });
};
