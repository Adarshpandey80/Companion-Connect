
const userController = require('../Controller/userController');
const express = require('express');
const router = express.Router();

router.post('/signup', userController.signup);