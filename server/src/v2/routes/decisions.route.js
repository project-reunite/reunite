const express = require('express');

const decisionsController = require('../controllers/decisions.controller');

const router = express.Router();

router.post('/', decisionsController.getDecision);

module.exports = router;
