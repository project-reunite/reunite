require('dotenv').config();
const express = require('express');

const v1Routes = require('./v1/routes');

const app = express();

app.use('/api/v1/', v1Routes);
app.use('/images', express.static('public'));

app.listen(9100, () => {
    console.log(`App running on port 9100`);
});

module.exports = app;