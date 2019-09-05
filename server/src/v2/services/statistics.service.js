const { insertDocument } = require('../../v1/services/database.service');

const postStatistic = (statistic) => insertDocument({ 
    database: 'statistics',
    doc: statistic,
});

module.exports = {
    postStatistic,
};
