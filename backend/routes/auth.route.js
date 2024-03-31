const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


router.post('/login', authController.Login);
router.get('/me', authController.Me);
router.post('/logout', authController.Logout);
exports = module.exports = router;