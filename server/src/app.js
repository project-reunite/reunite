require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('New client connected'),
    socket.on('disconnect', () => console.log('Client disconnected'));
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

app.use('/', express.static(path.join(__dirname, '..', '..', 'client', 'build')));
app.use('/images', express.static(path.join(__dirname, '..', 'public'))); // This needs to be below `express.static(path.join(__dirname, '..', '..', 'client', 'build')` in order to overwrite the /images dir correctly. We should change the names so we don't have to do this

app.use(middleware.errorHandler.handleErrors);

server.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// Uncomment to insert documents about the missing persons into Cloudant
// require('./v2/services/personsGenerator.service');

module.exports = app;
