const personsService = require('../../../../src/v1/services/persons.service');

const { expect } = require('../../../setup/chai.setup');
const persons = require('../../../../data/Persons');

describe('persons.service.js', function () {
    describe('getPerson', function () {
        describe(`with valid 'id' param`, function () {
            it('returns the person requested', function () {
                const expectedPerson = persons[0];
                const output = personsService.getPerson(expectedPerson.id);
                expect(output).to.deep.equal(expectedPerson);
            });
        });
    });
});
