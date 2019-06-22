const Database = require('./database.service');
const config = require('../../config');

const database = config.database.trees;

const getTree = (id) => Database.getDocument({ database, id });

const getTrees = async ({ filters }) => 
    await Database.getAllDocuments({ database, filters });

module.exports = {
    getTrees,
    getTree,
};
