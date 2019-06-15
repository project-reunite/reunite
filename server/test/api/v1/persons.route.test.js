const app = require('../../setup/app.setup');
const { expect } = require('../../setup/chai.setup');

const persons = require('../../../data/Persons')

describe('/api/v1', function () {
    describe('/persons', function () {
        describe('GET', function () {
            it('returns 200 and a body listing all persons', async function () {
                const res = await app().get('/api/v1/persons');
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.deep.equal(persons);
            });
        });
        describe('/{id}', function () {
            describe('GET', function () {
                describe(`with valid 'id' param`, function () {
                    it('returns 200 and a body containing the person requested', async function () {
                        const expectedPerson = persons[0]
                        const res = await app().get(`/api/v1/persons/${expectedPerson.id}`);
                        expect(res.status).to.equal(200);
                        expect(res.body).to.deep.equal(expectedPerson);
                    });
                });
            });
        });
        describe('/pair{index}', function () {
            describe('GET', function () {
                describe(`with valid 'index' param`, function () {
                    it('returns 200 and a body containing the person requested', async function () {
                        const expectedPair = [persons[0], persons[1]];
                        const res = await app().get(`/api/v1/persons/pairs/0`);
                        expect(res.status).to.equal(200);
                        expect(res.body).to.deep.equal(expectedPair);
                    });
                });
            });
        });
    });
});