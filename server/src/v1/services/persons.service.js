const Persons = require('../../../data/Persons');

const getPersons = () => Persons;

const getPerson = (id) => getPersons()
    .find(person => person.id === id);

const getPair = (index) => [
    getPersons()[index*2],
    getPersons()[index*2 + 1],
];

module.exports = {
    getPersons,
    getPerson,
    getPair,
};
