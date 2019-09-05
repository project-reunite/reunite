const statisticsService = require('../services/statistics.service');

const postStatistic = async function(req, res, next) {
    try {
        const statistic = await statisticsService.postStatistic(req.body);
        res.status(200).send(statistic);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    postStatistic,
};
