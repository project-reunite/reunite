const config = require('../../config');
const Database = require('./database.service');

const database = config.database.persons;

const getPerson = async(id, host) => {
    try {
        const person = await Database.getDocument({ database, id });
        person.img_url = host + person.img_url;
        return person;
    } catch(err) {
        return err;
    }
};

const getPersons = async ({ filters, host }) => {
    try {
        const persons = await Database.getAllDocuments({ database, filters });
        if (!host) {
            host = '';
        }
        persons.docs.forEach((person) => person.img_url = host + person.img_url);
        return persons;
    } catch(err) {
        return err;
    }
};

const getPersonsWithNFeatures = async() => {
    const persons = (await getPersons({ filters: { selector: {} } })).docs;
    const { NUM_FEATURES } = config;
    const personsWithNFeatures = persons.filter(person => person._id.length === NUM_FEATURES);
    return personsWithNFeatures;
};

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
    getPerson,
    getPersons,
    getPersonsWithNFeatures,
    getPair,
};
