const Database = require('./database.service');
const config = require('../../config');

const database = config.database.persons;

const getPerson = (id) => Database.getDocument({ database, id });

const getPersons = async ({ filters }) => 
    await Database.getAllDocuments({ database, filters });

const getPair = async (index) => {
    const persons = (await getPersons({ filters: { selector: {} } })).docs;
    if(index*2 + 1 < persons.length) {
        return [
            persons[index*2],
            persons[index*2 + 1],
        ];
    } else {
        throw new Error('Index invalid');
    }
};

module.exports = {
    getPersons,
    getPerson,
    getPair,
};
