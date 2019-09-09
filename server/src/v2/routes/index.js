const express = require('express');

const root = require('./root.route');
const decisions = require('./decisions.route');
const statistics = require('./statistics.route');

const router = express.Router();

router.use('/', root);
router.use('/decisions', decisions);
router.use('/statistics', statistics);

module.exports = router;
