const decisionsService = require('../services/decisions2.service');
const personsService = require('../../v1/services/persons.service');

const getDecision = async function(req, res, next) {
    const { decisions, viewedPeople } = req.body;

    try {
        const decision = await decisionsService.getNextDecision(
            decisions,
            viewedPeople
        );
        res.status(200).send(decision);
    } catch(err) {
        next(err);
    }
    try {
        const rankedUrls = await personsService.getOrderedPersonUrls(decisions);
        req.io.emit('rankedPeople', rankedUrls);
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    getDecision,
};
