require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const middleware = require('./middleware');
const v1Routes = require('./v1/routes');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/api/v1/', v1Routes);
app.use('/images', express.static('public'));
app.use(middleware.errorHandler.handleErrors);

app.listen(9100, () => {
    console.log(`App running on port 9100`);
});

module.exports = app;
