require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const middleware = require('./middleware');
const v1Routes = require('./v1/routes');

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:41002');
    next();
});

app.use('/api/v1/', v1Routes);
app.use('/images', express.static('public'));
app.use(middleware.errorHandler.handleErrors);

app.listen(9100, () => {
    console.log(`App running on port 9100`);
});

module.exports = app;
