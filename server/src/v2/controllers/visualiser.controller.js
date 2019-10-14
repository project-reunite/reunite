const postSettings = function(req, res, next) {
    try {
        res.sendStatus(200);
        req.io.emit('settings', req.body);
    } catch (err) {
        next(err);
    }
};

const postCurrentUser = function(req, res, next) {
    try {
        const username = req.body.username;
        res.sendStatus(200);
        req.io.emit('currentUser', username);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    postSettings,
    postCurrentUser,
};
