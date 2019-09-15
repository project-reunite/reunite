const decisionsService = require('../services/decisions2.service');

const getDecision = async function(req, res, next) {
    const { decisions, viewedPeople } = req.body;
    try {
        decisionsService.sendRankedPeopleToDemo(
            decisions,
            viewedPeople,
            req.io
        );
        const decision = await decisionsService.getNextDecision(
            decisions,
            viewedPeople
        );
        res.status(200).send(decision);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getDecision,
};
