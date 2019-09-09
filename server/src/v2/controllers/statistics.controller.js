const statisticsService = require('../services/statistics.service');

const postStatistic = async function(req, res, next) {
    try {
        const statistic = await statisticsService.postStatistic({ ...req.body, username: 'Michael' });
        res.status(200).send(statistic);
    } catch(err) {
        next(err);
    }
};

const getStatistics = async function(req, res, next) {
    const { time_from, username } = req.query;
    try {
        const statistics = await statisticsService.getStatistics({ time_from, username });
        res.status(200).send(statistics);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    postStatistic,
    getStatistics,
};
