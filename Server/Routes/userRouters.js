
const userController = require('../Controller/userController');
const express = require('express');
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/become-companion', userController.becomeCompanion);

module.exports = router;