const express = require('express');

const personsController = require('../controllers/decisions.controller');

const router = express.Router();

router.get('/', personsController.getDecisions);
    
router.get('/:id', personsController.getDecision);

module.exports = router;
