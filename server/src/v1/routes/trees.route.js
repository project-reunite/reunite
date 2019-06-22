const express = require('express');

const personsController = require('../controllers/trees.controller');

const router = express.Router();

router.get('/', personsController.getTrees);
    
router.get('/:id', personsController.getTree);

module.exports = router;
