const databaseService = require('../../src/v1/services/database.service');

const initialiseDatabase = async ({ database, documents }) => {
    if(await databaseService.databaseExists({ database })){
        await databaseService.destroyDatabase({ database });
    }
    await databaseService.createDatabase({ database });
    await Promise.all(documents.map(doc => databaseService.insertDocument({
        database,
        doc,
    })));
    return databaseService.getAllDocuments({ database, filters: { selector: {} } });
};

module.exports = {
    initialiseDatabase,
};