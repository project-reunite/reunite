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
        const detailsToDisplay = {};
        detailsToDisplay.rankedPersons = await personsService.getOrderedPersons(
            decisions,
            viewedPeople
        );
        detailsToDisplay.currentPersons = [
            decision.choices[0].personId,
            decision.choices[1].personId,
        ];
        req.io.emit('rankedPersons', detailsToDisplay);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getDecision,
};
