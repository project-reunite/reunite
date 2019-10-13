require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socketIo(server, { origins: '*:*' });

let users = {};

const getUsers = () => {
    return Object.keys(users).map(key => {
        return users[key].username;
    });
};

const createUser = user => {
    users = Object.assign(
        {
            [user.username]: {
                username: user.username,
                sockets: [user.socket_id],
            },
        },
        users
    );
};

const createSocket = user => {
    let cur_user = users[user.username],
        updated_user = {
            [user.username]: Object.assign(cur_user, {
                sockets: [...cur_user.sockets, user.socket_id],
            }),
        };
    users = Object.assign(users, updated_user);
};

const removeSocket = socket_id => {
    let username = '';
    Object.keys(users).map(key => {
        let sockets = users[key].sockets;
        if (sockets.indexOf(socket_id) !== -1) {
            username = key;
        }
    });
    let user = users[username];
    if (user && user.sockets.length > 1) {
        // Remove socket only
        let index = user.sockets.indexOf(socket_id);
        let updated_user = {
            [username]: Object.assign(user, {
                sockets: user.sockets
                    .slice(0, index)
                    .concat(user.sockets.slice(index + 1)),
            }),
        };
        users = Object.assign(users, updated_user);
    } else {
        // Remove user by key
        let clone_users = Object.assign({}, users);
        delete clone_users[username];
        users = clone_users;
    }
};

io.on('connection', socket => {
    let query = socket.request._query;
    const user = {
        username: query.username,
        socket_id: socket.id,
    };
    if (user.username) {
        console.log(`${user.username} connected`);
        if (users[user.username]) {
            createSocket(user);
            socket.emit('users', getUsers());
        } else {
            createUser(user);
            io.emit('newUser', user.username);
            io.emit('users', getUsers());
        }
    }
    socket.on('disconnect', () => {
        let username = '';
        Object.keys(users).map(key => {
            let sockets = users[key].sockets;
            if (sockets.indexOf(socket.id) !== -1) {
                username = key;
            }
        });
        console.log(`${username} disconnected`);
        removeSocket(socket.id);
        io.emit('users', getUsers());
    });
});

const middleware = require('./middleware');
const { port } = require('./config');

const v1Routes = require('./v1/routes');
const v2Routes = require('./v2/routes');

app.use(cors());

app.use(function(req, res, next) {
    req.io = io;
    next();
});

app.use(bodyParser.json());
app.use('/api/v1/', v1Routes);
app.use('/api/v2/', v2Routes);

// Uncomment to deploy the stats page. Remember to update `npm run build`
// app.use('/stats', express.static(path.join(__dirname, '..', '..', 'statistics', 'build')));
app.use(
    '/',
    express.static(path.join(__dirname, '..', '..', 'client', 'build'))
);
app.use('/images', express.static(path.join(__dirname, '..', 'public'))); // This needs to be below `express.static(path.join(__dirname, '..', '..', 'client', 'build')` in order to overwrite the /images dir correctly. We should change the names so we don't have to do this

app.use(middleware.errorHandler.handleErrors);

server.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// Uncomment to insert documents about the missing persons into Cloudant
// require('./v2/services/personsGenerator.service');

module.exports = app;
