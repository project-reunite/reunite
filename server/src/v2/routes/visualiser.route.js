const express = require('express');

const visualiserController = require('../controllers/visualiser.controller');

const router = express.Router();

router.post('/settings', visualiserController.postSettings);

router.post('/currentUser', visualiserController.postCurrentUser);

module.exports = router;
