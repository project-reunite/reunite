const app = require('../../setup/app.setup');

const { expect } = require('../../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../../setup/jsonSchemas.setup');
const decisions = require('../../../data/Decisions');
const databaseSetup = require('../../setup/database.setup');
const config = require('../../../src/config');

const decisionsDb = config.database.decisions;

describe('/api/v1', function () {
    before(async function() {
        this.timeout(10000);
        await databaseSetup.initialiseDatabase({ database: decisionsDb, documents: decisions });
    });
    describe('/decisions', function () {
        describe('GET', function () {
            it('returns 200 and a body listing all decisions', async function () {
                const res = await app().get('/api/v1/decisions');
                expect(res.status).to.equal(200);
                expect(res.body.docs).to.be.an('array').of.length(decisions.length);
                for(const member of res.body.docs) {
                    expect(fitsSchema(member, jsonSchemas.Decision)).to.be.true;
                }
            });
        });
        describe('/{id}', function () {
            describe('GET', function () {
                describe(`with valid 'id' param`, function () {
                    it('returns 200 and a body describing the decision requested', async function () {
                        const decisions = (await app().get('/api/v1/decisions')).body.docs;
                        const res = await app().get(`/api/v1/decisions/${decisions[0]._id}`);
                        expect(res.status).to.equal(200);
                        expect(fitsSchema(res.body, jsonSchemas.Decision)).to.be.true;
                    });
                });
                describe(`with invalid 'id' param`, function () {
                    describe(`unknown id`, function () {
                        it('returns 404 and a body explaining the error', async function () {
                            const id = 'unknownID';
                            const res = await app().get(`/api/v1/decisions/unknownID`);
                            expect(res.status).to.equal(404);
                            expect(res.body.error).to.equal(`decision ${id} not found`);
                        });
                    });
                });
            });
        });
    });
});
