const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);

module.exports = router;
