const express = require('express');

const visualiserController = require('../controllers/visualiser.controller');

const router = express.Router();

router.post('/settings', visualiserController.postSettings);

router.post('/currentUser', visualiserController.postCurrentUser);

router.get('/users', visualiserController.getUsers);

module.exports = router;
