const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

router.post('/login', adminAuthController.login);
router.post('/register', adminAuthController.register);

module.exports = router;
