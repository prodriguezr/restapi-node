const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const postCtrl = require('../controllers/post');

router.get('/', verify, postCtrl.getPosts);
router.post('/', verify, postCtrl.createPost);
router.get('/:id', verify, postCtrl.getPost);
router.put('/:id', verify, postCtrl.editPost);
router.delete('/:id', verify, postCtrl.deletePost);

module.exports = router;