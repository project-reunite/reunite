const app = require('../../setup/app.setup');

const { expect } = require('../../setup/chai.setup');
const { jsonSchemas, fitsSchema } = require('../../setup/jsonSchemas.setup');
const trees = require('../../../data/Trees');
const databaseSetup = require('../../setup/database.setup');
const config = require('../../../src/config');

const treesDb = config.database.trees;

describe('/api/v1', function () {
    before(async function() {
        this.timeout(10000);
        await databaseSetup.initialiseDatabase({ database: treesDb, documents: trees });
    });
    describe('/trees', function () {
        describe('GET', function () {
            it('returns 200 and a body listing all trees', async function () {
                const res = await app().get('/api/v1/trees');
                expect(res.status).to.equal(200);
                expect(res.body.docs).to.be.an('array').of.length(trees.length);
                for(const member of res.body.docs) {
                    expect(fitsSchema(member, jsonSchemas.Tree)).to.be.true;
                }
            });
            describe('With gender filter = Male', function () {
                it('returns 200 and a body listing all trees', async function () {
                    const res = await app().get('/api/v1/trees?gender=Male');
                    expect(res.status).to.equal(200);
                    expect(res.body.docs).to.be.an('array').of.length(trees.filter(tree => tree.gender == 'Male').length);
                    for(const member of res.body.docs) {
                        expect(fitsSchema(member, jsonSchemas.Tree)).to.be.true;
                    }
                });
                describe('and maxAge = 55', function () {
                    it('returns 200 and a body listing all trees', async function () {
                        const res = await app().get('/api/v1/trees?gender=Male&maxAge=55');
                        expect(res.status).to.equal(200);
                        expect(res.body.docs).to.be.an('array').of.length(1);
                        for(const member of res.body.docs) {
                            expect(fitsSchema(member, jsonSchemas.Tree)).to.be.true;
                        }
                    });
                    describe('and minAge = 54', function () {
                        it('returns 200 and a body listing all trees', async function () {
                            const res = await app().get('/api/v1/trees?gender=Male&maxAge=55&minAge=54');
                            expect(res.status).to.equal(200);
                            expect(res.body.docs).to.be.an('array').of.length(1);
                            for(const member of res.body.docs) {
                                expect(fitsSchema(member, jsonSchemas.Tree)).to.be.true;
                            }
                        });
                    });
                });
                describe('and minAge = 5', function () {
                    it('returns 200 and a body listing all trees', async function () {
                        const res = await app().get('/api/v1/trees?gender=Male&minAge=5');
                        expect(res.status).to.equal(200);
                        expect(res.body.docs).to.be.an('array').of.length(2);
                        for(const member of res.body.docs) {
                            expect(fitsSchema(member, jsonSchemas.Tree)).to.be.true;
                        }
                    });
                    describe('and maxAge = 100', function () {
                        it('returns 200 and a body listing all trees', async function () {
                            const res = await app().get('/api/v1/trees?gender=Male&maxAge=100&minAge=5');
                            expect(res.status).to.equal(200);
                            expect(res.body.docs).to.be.an('array').of.length(2);
                            for(const member of res.body.docs) {
                                expect(fitsSchema(member, jsonSchemas.Tree)).to.be.true;
                            }
                        });
                    });
                    describe('and maxAge = 30', function () {
                        it('returns 200 and a body listing all trees', async function () {
                            const res = await app().get('/api/v1/trees?gender=Male&maxAge=30&minAge=5');
                            expect(res.status).to.equal(200);
                            expect(res.body.docs).to.be.an('array').of.length(1);
                            for(const member of res.body.docs) {
                                expect(fitsSchema(member, jsonSchemas.Tree)).to.be.true;
                            }
                        });
                    });
                    describe('and maxAge = 10', function () {
                        it('returns 200 and a body listing all trees', async function () {
                            const res = await app().get('/api/v1/trees?gender=Male&maxAge=10&minAge=5');
                            expect(res.status).to.equal(200);
                            expect(res.body.docs).to.be.an('array').of.length(0);
                            for(const member of res.body.docs) {
                                expect(fitsSchema(member, jsonSchemas.Tree)).to.be.true;
                            }
                        });
                    });
                });
            });
        });
        describe('/{id}', function () {
            describe('GET', function () {
                describe(`with valid 'id' param`, function () {
                    it('returns 200 and a body describing the tree requested', async function () {
                        const trees = (await app().get('/api/v1/trees')).body.docs;
                        const res = await app().get(`/api/v1/trees/${trees[0]._id}`);
                        expect(res.status).to.equal(200);
                        expect(fitsSchema(res.body, jsonSchemas.Tree)).to.be.true;
                    });
                });
                describe(`with invalid 'id' param`, function () {
                    describe(`unknown id`, function () {
                        it('returns 404 and a body explaining the error', async function () {
                            const id = 'unknownID';
                            const res = await app().get(`/api/v1/trees/unknownID`);
                            expect(res.status).to.equal(404);
                            expect(res.body.error).to.equal(`tree ${id} not found`);
                        });
                    });
                });
            });
        });
    });
});
