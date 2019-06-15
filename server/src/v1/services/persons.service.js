const Persons = require('../../../data/Persons');

const getPersons = () => Persons;

const getPerson = (id) => getPersons()
    .filter(person => person.id === id)[0];

const getPair = (index) => [getPersons()[index * 2], getPersons()[index * 2 + 1]]

module.exports = {
    getPersons,
    getPerson,
    getPair,
};
