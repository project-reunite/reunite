const personsService = require('../services/persons.service');

module.exports = {
    getPerson: personsService.getPerson,
    getPersons: personsService.getPersons,
    getPair: personsService.getPair,
};
