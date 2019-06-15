const express = require('express');

const personsController = require('../controllers/persons.controller');

const router = express.Router();

router.get('/', async (req, res) => {
    const persons = await personsController.getPersons();
    res.status(200).send(persons);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const person = await personsController.getPerson(id);
    if (!person) {
        res.status(404).send({ error: `person ${id} not found` });
    } else {
        res.status(200).send(person);
    }
});
router.get('/pairs/:index', async (req, res) => {
    const index = req.params.index;
    const pair = await personsController.getPair(index);
    res.status(200).send(pair);
});

module.exports = router;
