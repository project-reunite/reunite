const express = require('express');

const decisionsController = require('../controllers/decisions.controller');

const router = express.Router();

router.get('/', decisionsController.getDecision);

module.exports = router;
