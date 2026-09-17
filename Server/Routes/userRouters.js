const userController = require('../Controller/userController');
const { authenticateToken } = require('../middleware/auth');
const imageUpload = require('../middleware/upload');
const express = require('express');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.post(
  '/become-companion',
  authenticateToken,
  imageUpload.array('images', 4),
  userController.becomeCompanion
);

module.exports = router;