const express = require('express');

const root = require('./root.route');
const persons = require('./persons.route');
const trees = require('./trees.route');
const decisions = require('./decisions.route');
const visuals = require('./visuals.route');
const user = require('./users.route');

const router = express.Router();

router.use('/', root);
router.use('/persons', persons);
router.use('/trees', trees);
router.use('/decisions', decisions);
router.use('/visuals', visuals);
router.use('/users', user);

module.exports = router;
