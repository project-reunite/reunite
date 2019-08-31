const decisionsService = require('../services/decisions.service');

const getDecision = async function(req, res, next) {
    const { decisions } = req.body;
    try {
        const decision = await decisionsService.getNextDecision(decisions);
        res.status(200).send(decision);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getDecision,
};
