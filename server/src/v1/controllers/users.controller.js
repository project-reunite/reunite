const usersService = require('../services/users.service');

const createUser = async function(req, res, next) {
    try {
        const username = await usersService.getUsername();
        usersService.addUserToDemo(username, req.io);
        res.status(200).send(username);
    } catch (err) {
        next(err);
    }
};

const deleteUser = function(req, res, next) {
    try {
        const username = req.body.username;
        console.log('deleeeeet');
        usersService.removeUserFromDemo(username, req.io);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createUser,
    deleteUser,
};
