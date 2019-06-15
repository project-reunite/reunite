const rewire = require('rewire');

const { expect } = require('../../../setup/chai.setup');

const personsService = rewire('../../../../src/v1/services/persons.service');

const getPerson = personsService.__get__('getPerson');
