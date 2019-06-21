const Database = require('./database.service');
const config = require('../../config');

const database = config.database.persons;

const getPersons = () => Database.getAllDocuments({ database });

const getPerson = (id) => Database.getDocument({ database, id });

const getPair = async (index) => {
    const persons = (await getPersons()).rows;
    if(index*2 + 1 < persons.length) {
        return Promise.all([
            getPerson(persons[index*2].id),
            getPerson(persons[index*2 + 1].id),
        ]);
    } else {
        throw new Error('Index invalid');
    }
};

module.exports = {
    getPersons,
    getPerson,
    getPair,
};
