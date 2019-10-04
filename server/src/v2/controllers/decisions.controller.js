const decisionsService = require('../services/decisions2.service');
const personsService = require('../../v1/services/persons.service');

const getDecision = async function(req, res, next) {
    const { decisions, viewedPeople, username } = req.body;

    try {
        const decision = await decisionsService.getNextDecision(
            decisions,
            viewedPeople
        );
        res.status(200).send(decision);
        const detailsToDisplay = {};
        const nextSelectionDetails = await personsService.getOrderedPersonsAndPrediction(
            decisions,
            viewedPeople
        );
        detailsToDisplay.rankedPersons = nextSelectionDetails.rankedPersons;
        detailsToDisplay.facePrediction = nextSelectionDetails.prediction;
        detailsToDisplay.currentPersons = [
            decision.choices[0].personId,
            decision.choices[1].personId,
        ];
        detailsToDisplay.username = username;
        req.io.emit('rankedPersons', detailsToDisplay);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getDecision,
};
