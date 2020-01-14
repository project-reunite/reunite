const express = require('express');

const root = require('./root.route');
const decisions = require('./decisions.route');
const statistics = require('./statistics.route');
const visualiser = require('./visualiser.route');

const router = express.Router();

router.use('/', root);
router.use('/decisions', decisions);
router.use('/statistics', statistics);
router.use('/visualiser', visualiser);

module.exports = router;
