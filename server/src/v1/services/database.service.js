const Cloudant = require('@cloudant/cloudant');

const { dbConfig } = require('../../config');

const cloudant = Cloudant(dbConfig);

const getDocument = ({ database, id }) => cloudant.db.use(database).get(id);

const getAllDocuments = ({ database, filters }) => cloudant.db.use(database).find(filters);

const insertDocument = ({ database, doc }) => cloudant.db.use(database).insert(doc);

const insertDocuments = ({ database, docs }) => cloudant.db.use(database).bulk({ docs });

const createDatabase = ({ database }) => cloudant.db.create(database);

const destroyDatabase = ({ database }) => cloudant.db.destroy(database);

const databaseExists = async ({ database }) => {
    const databases = await cloudant.db.list(database);
    return databases.includes(database);
};

module.exports = {
    getDocument,
    getAllDocuments,
    insertDocument,
    insertDocuments,
    createDatabase,
    destroyDatabase,
    databaseExists,
};
