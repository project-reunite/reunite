const app = require('../../setup/app.setup');
const { expect } = require('../../setup/chai.setup');

describe('/api/v1', function () {
    describe('GET', function () {
        it('returns 200', async function () {
            const res = await app().get('/api/v1/');
            expect(res.status).to.equal(200);
        });
    });
});
