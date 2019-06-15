const chai = require('chai');
[
    require('chai-http'),
    require('chai-things'),
    require('sinon-chai'),
].map(plugin => chai.use(plugin));

module.exports = chai;