const personsService = require('../services/persons.service');

const getPersons = async function(req, res, next) {
    try {
        const persons = await personsService.getPersons({
            filters: { selector: {} },
            host: req.protocol + '://' + req.get('host'),
        });
        res.status(200).send(persons);
    } catch(err) {
        next(err);
    }
};

const getPersonsWithNFeatures = async function(req, res, next) {
    try {
        const persons = await personsService.getPersonsWithNFeatures({
            filters: { selector: {} },
            host: req.protocol + '://' + req.get('host'),
        });
        res.status(200).send(persons);
    } catch(err) {
        next(err);
    }
};

const getPerson = async function(req, res, next) {
    let id = req.params.id;
    try {
        const person = await personsService.getPerson(id, req.protocol + '://' + req.get('host') );
        if(person.statusCode === 404) {
            const error = {
                message: `person ${id} not found`,
                statusCode: 404,
            };
            next(error);
        } else {
            res.status(200).send(person);
        }
    } catch(err) {
        next(err);
    }
};

const getPair = async function(req, res, next) {
    try {
        const pairIndex = req.params.index;
        const pair = await personsService.getPair(pairIndex);
        res.status(200).send(pair);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getPerson,
    getPersons,
    getPersonsWithNFeatures,
    getPair,
};
