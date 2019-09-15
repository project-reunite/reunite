const Database = require('./database.service');
const config = require('../../config');

const database = config.database.decisions;

const getDecision = id => Database.getDocument({ database, id });

const getDecisions = async ({ filters }) =>
    await Database.getAllDocuments({ database, filters });

module.exports = {
    getDecisions,
    getDecision,
};
