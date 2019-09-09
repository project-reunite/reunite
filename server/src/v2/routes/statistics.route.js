const express = require('express');

const statisticsController = require('../controllers/statistics.controller');

const router = express.Router();

router.post('/', statisticsController.postStatistic);
router.get('/', statisticsController.getStatistics);

module.exports = router;
