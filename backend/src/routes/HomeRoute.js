const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.get('/', homeController.foo);
router.post('/', homeController.foo);

module.exports = router;
