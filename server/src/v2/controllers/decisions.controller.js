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
        const nextSelectionDetails = await personsService.getOrderedPersonsAndPrediction(
            decisions,
            viewedPeople
        );
        req.users.updateUser(username, {
            rankedPersons: nextSelectionDetails.rankedPersons,
            facePrediction: nextSelectionDetails.prediction,
            currentPersons: [
                decision.choices[0].personId,
                decision.choices[1].personId,
            ],
        });
        const users = req.users.getUsers();
        req.io.emit('visualiserData', users);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getDecision,
};
