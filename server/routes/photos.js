const express = require('express');
const router = express.Router();
const {
  getPhotos,
  createPhotos,
  updatePhotos,
  deletePhotos,
} = require('../controllers/photoController');

router.get('/', getPhotos);
router.post('/', createPhotos);
router.put('/:id', updatePhotos);
router.delete('/:id', deletePhotos);

module.exports = router;
