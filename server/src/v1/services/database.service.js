const Cloudant = require('@cloudant/cloudant');
 
const account = process.env.DB_ACCOUNT;
const password = process.env.DB_PASSWORD;
 
const cloudant = new Cloudant({
    account, 
    password, 
    maxAttempt: 5, 
    plugins: [
        { 
            retry: { retryErrors: false, retryStatusCodes: [ 429 ] },
        },
    ],
});

const getDocument = ({ database, id }) => cloudant.db.use(database).get(id);

const getAllDocuments = ({ database, filters }) => cloudant.db.use(database).find(filters);

const insertDocument = ({ database, doc }) => cloudant.db.use(database).insert(doc);

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
    createDatabase,
    destroyDatabase,
    databaseExists,
};