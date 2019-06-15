const express = require('express');

const root = require('./root.route');
const persons = require('./persons.route');

const router = express.Router();

router.use('/', root);
router.use('/persons', persons);
module.exports = router;
