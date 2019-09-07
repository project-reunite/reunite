const visualsService = require('../services/visuals.service');

const getVisualsForUser = async function(req, res, next) {
    try {
        const username = req.params.username;
        console.log('req.params');
        console.log(req.params);
        console.log('username');
        console.log(username);
        const visuals = await visualsService.getVisualsForUser(username);
        res.status(200).send(visuals);
    } catch(err) {
        next(err);
        // TODO use async catching package
    }
};

module.exports = {
    getVisualsForUser,
};
