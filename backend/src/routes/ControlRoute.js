const express = require('express');
const router = express.Router();

const controlController = require('../app/controllers/ControlController');

router.get('/', controlController.foo);

module.exports = router;
