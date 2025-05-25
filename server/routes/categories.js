const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  // updateCategory,
  createCategory,
  deleteCategory
} = require('../controllers/categoryController');

const authenticate = require('../middleware/authenticate');

router.use(authenticate);

router.post('/', createCategory);
router.get('/', getCategories);
router.delete('/:id', deleteCategory);
router.get('/:id', getCategoryById);
// router.put('/:id', updateCategory);

module.exports = router;
