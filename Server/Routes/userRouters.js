
const userController = require('../Controller/userController');
const { authenticateToken } = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// Protected routes — must be logged in
router.post('/become-companion', authenticateToken, userController.becomeCompanion);

module.exports = router;