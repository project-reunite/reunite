const decisionsService = require('../services/decisions.service');

const getDecisions = async function(req, res, next) {
    try {
        const decisions = await decisionsService.getDecisions({ filters: { selector: {} } });
        res.status(200).send(decisions);
    } catch(err) {
        next(err);
    }
};

const getDecision = async function(req, res, next) {
    let id = req.params.id;
    try {
        const decision = await decisionsService.getDecision(id);
        res.status(200).send(decision);
    } catch(err) {
        if(err.error === 'not_found') {
            const error = {
                message: `decision ${id} not found`,
                statusCode: 404,
            };
            next(error);
        } else {
            next(err);
        }
    }
};

module.exports = {
    getDecision,
    getDecisions,
};
