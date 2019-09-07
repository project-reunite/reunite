const express = require('express');

const visualsController = require('../controllers/visuals.controller');

const router = express.Router();

// router.get('/', visualsController);

router.get('/:username', visualsController.getVisualsForUser);

module.exports = router;
