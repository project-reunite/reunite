const express = require('express');

const personsController = require('../controllers/persons.controller');

const router = express.Router();

router.get('/', personsController.getPersons);
    
router.get('/:id', personsController.getPerson);

router.get('/pairs/:index', personsController.getPair);

module.exports = router;
