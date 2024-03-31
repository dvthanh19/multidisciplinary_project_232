const express = require('express');
const router = express.Router();

const dashboardController = require('../app/controllers/DashboardController');

router.get('/', dashboardController.foo);

module.exports = router;
