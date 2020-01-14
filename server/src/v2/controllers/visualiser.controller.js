const postSettings = function(req, res, next) {
    try {
        req.io.emit('settings', req.body);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

const postCurrentUser = function(req, res, next) {
    try {
        const username = req.body.username;
        req.io.emit('currentUser', username);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
};

const getUsers = function(req, res, next) {
    try {
        const users = req.users.getUsers();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    postSettings,
    postCurrentUser,
    getUsers,
};
