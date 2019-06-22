const app = require('../../setup/app.setup');

const { expect } = require('../../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../../setup/jsonSchemas.setup');
const persons = require('../../../data/Persons');
const databaseSetup = require('../../setup/database.setup');
const config = require('../../../src/config');

const personsDb = config.database.persons;

describe('/api/v1', function () {
    before(async function() {
        this.timeout(10000);
        await databaseSetup.initialiseDatabase({ database: personsDb, documents: persons });
    });
    describe('/persons', function () {
        describe('GET', function () {
            it('returns 200 and a body listing all persons', async function () {
                const res = await app().get('/api/v1/persons');
                expect(res.status).to.equal(200);
                expect(res.body.docs).to.be.an('array').of.length(persons.length);
                for(const member of res.body.docs) {
                    expect(fitsSchema(member, jsonSchemas.Person)).to.be.true;
                }
            });
        });
        describe('/{id}', function () {
            describe('GET', function () {
                describe(`with valid 'id' param`, function () {
                    it('returns 200 and a body describing the person requested', async function () {
                        const persons = (await app().get('/api/v1/persons')).body.docs;
                        const res = await app().get(`/api/v1/persons/${persons[0]._id}`);
                        expect(res.status).to.equal(200);
                        expect(fitsSchema(res.body, jsonSchemas.Person)).to.be.true;
                    });
                });
                describe(`with invalid 'id' param`, function () {
                    describe(`unknown id`, function () {
                        it('returns 404 and a body explaining the error', async function () {
                            const id = 'unknownID';
                            const res = await app().get(`/api/v1/persons/unknownID`);
                            expect(res.status).to.equal(404);
                            expect(res.body.error).to.equal(`person ${id} not found`);
                        });
                    });
                });
            });
        });
        describe('/pair/{index}', function () {
            describe('GET', function () {
                describe(`with valid 'index' param`, function () {
                    describe(`not a number`, function () {
                        it('returns 200 and a body containing the person requested', async function () {
                            const res = await app().get(`/api/v1/persons/pairs/0`);
                            expect(res.status).to.equal(200);
                            
                        });
                    });
                });
                describe(`with invalid 'index' param`, function () {
                    describe(`not a number`, function () {
                        it('returns 200 and a body containing the person requested', async function () {
                            const res = await app().get(`/api/v1/persons/pairs/e`);
                            expect(res.status).to.equal(500);
                            expect(res.body.error).to.equal(`Index invalid`);
                        });
                    });
                });
            });
        });
    });
});
