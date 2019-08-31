const express = require('express');

const root = require('./root.route');
const decisions = require('./decisions.route');

const router = express.Router();

router.use('/', root);
router.use('/decisions', decisions);
module.exports = router;
