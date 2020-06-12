const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user');

router.post('/signup', userControllers.createUser);

router.post('/login', userControllers.signin);

module.exports = router;