require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const middleware = require('./middleware');
const { port } = require('./config');
const v1Routes = require('./v1/routes');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/api/v1/', v1Routes);

app.use('/', express.static(path.join(__dirname, '..', '..', 'client', 'build')));
app.use('/visualise', express.static(path.join(__dirname, '..', '..', 'visualiser-client', 'build')));
app.use('/images', express.static(path.join(__dirname, '..', 'public'))); // This needs to be below `express.static(path.join(__dirname, '..', '..', 'client', 'build')` in order to overwrite the /images dir correctly. We should change the names so we don't have to do this

app.use(middleware.errorHandler.handleErrors);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

module.exports = app;
