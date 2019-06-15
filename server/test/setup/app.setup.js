const app = require('../../src/app');
const chai = require('./chai.setup');

module.exports = () => chai.request(app);

/*
Usage:

const app = require('../setup/app.setup');
const res = await app().get('/');

*/
