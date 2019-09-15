const Database = require('./database.service');
const decisionsService = require('../../v2/services/decisions2.service');
const config = require('../../config');

const database = config.database.persons;

const getPerson = async (id, host) => {
    try {
        const person = await Database.getDocument({ database, id });
        person.img_url = host + person.img_url;
        return person;
    } catch (err) {
        return err;
    }
};

const getPersons = async ({ filters, host }) => {
    try {
        const persons = await Database.getAllDocuments({ database, filters });
        if (!host) {
            host = '';
        }
        persons.docs.forEach(
            person => (person.img_url = host + person.img_url)
        );
        return persons;
    } catch (err) {
        return err;
    }
};

const getPersonUrls = async () => {
    const persons = (await getPersons({ filters: { selector: {} } })).docs;
    const personsWith6Features = persons.filter(
        person => person._id.length === 6
    );
    const urls = personsWith6Features.map(person => person.img_url);
    return urls;
};

const getOrderedPersonUrls = async decisions => {
    const persons = (await getPersons({ filters: { selector: {} } })).docs;
    const personsWith6Features = persons.filter(
        person => person._id.length === 6
    );
    const prediction = decisionsService.getPrediction(decisions, 6);
    let rankedPeople = personsWith6Features.map(person => ({
        ...person,
        probability: decisionsService.rankPerson(person._id, prediction)
            .probability,
    }));
    rankedPeople = rankedPeople.sort((a, b) => b.probability - a.probability);
    const rankedPeopleUrls = rankedPeople.map(person => person.img_url);
    return rankedPeopleUrls;
};

const getPair = async index => {
    const persons = (await getPersons({ filters: { selector: {} } })).docs;
    if (index * 2 + 1 < persons.length) {
        return [persons[index * 2], persons[index * 2 + 1]];
    } else {
        throw new Error('Index invalid');
    }
};

module.exports = {
    getPerson,
    getPersons,
    getPersonUrls,
    getPair,
    getOrderedPersonUrls,
};
