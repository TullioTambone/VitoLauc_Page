const express = require('express');
const router = express.Router();
const {
    getTrash,
    restorePost,
    permanentlyDelete
} = require('../controllers/trashController');

const authenticate = require('../middleware/authenticate');

router.use(authenticate);

router.get('/trash', getTrash);
router.post('/:id/restore', restorePost);
router.delete('/:id', permanentlyDelete);

module.exports = router;
