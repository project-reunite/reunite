const usersService = require('../services/users.service');

const createUser = async function(req, res, next) {
    try {
        const username = await usersService.getUsername();
        res.status(200).send(username);
    } catch (err) {
        next(err);
    }
};

const deleteUser = function(req, res, next) {
    try {
        const username = req.body.username;
        req.users.deleteUser(username);
        res.sendStatus(200);
        const newUsers = req.users.getUsers();
        req.io.emit('visualiserData', newUsers);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createUser,
    deleteUser,
};
