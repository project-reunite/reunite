const { personsService } = require('../services');

module.exports = {
    getPerson: personsService.getPerson,
    getPersons: personsService.getPersons,
    getPair: personsService.getPair,
};
