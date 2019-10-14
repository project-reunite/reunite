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
        // usersService.removeUserFromDemo(username, req.io);
        req.users.deleteUser(username);
        res.sendStatus(200);
        const newUserList = req.users.getUserList();
        req.io.emit('users', newUserList);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createUser,
    deleteUser,
};
