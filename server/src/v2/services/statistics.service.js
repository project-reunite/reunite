const { insertDocument, getAllDocuments } = require('../../v1/services/database.service');
const { env } = require('../../config');

const database = 'statistics';

const postStatistic = (doc) => {
    if (env === 'development') {
        return;
    }

    insertDocument({
        database,
        doc: { ...doc , created_at: Date.now() },
    });
};

const getStatistics = ({ time_from, username }) => {
    const filters = { selector: {} };
    if (time_from) {
        filters.selector.created_at = { '$gte': parseInt(time_from) };
    }
    if (username) {
        filters.selector.username = { '$eq': username };
    }
    return getAllDocuments({
        database,
        filters,
    });
};

module.exports = {
    postStatistic,
    getStatistics,
};
