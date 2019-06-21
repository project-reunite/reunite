const ZSchema = require('z-schema');
const util = require('util');

const { expect } = require('./chai.setup');

const validator = new ZSchema({});

const jsonSchemas = {
    CloudantObject: {
        id: 'CloudantObject',
        type: 'object',
        properties: {
            id: { type: 'string' },
            key: { type: 'string' },
            value: { type: 'object' },
        },
        required: ['id', 'key', 'value'],
    },
    Person: {
        id: 'Person',
        type: 'object',
        required: ['_id', '_rev', 'age', 'gender', 'img_url', 'name'],
        properties: {
            _id: { type: 'string' },
            _rev: { type: 'string' },
            age: { type: 'string' },
            gender: { type: 'string' },
            img_url: { type: 'string' },
            name: { type: 'string' },
        },
    },
};

function fitsSchema(obj, schema) {
    try {
        expect(validator.validate(obj, schema)).to.be.true;
        return true;
    } catch (error) {
        const details = validator.getLastError().details[0];
        const errMsg = extractProperties(details, ['message', 'schemaId']);
        error.message += `\n      ErrorInfo: ${util.inspect(errMsg)}`;
        throw (error);
    }
}

function extractProperties(obj, keys) {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (keys.includes(key)) {
            newObj[key] = value;
        }
    }
    return newObj;
}

module.exports = {
    jsonSchemas,
    fitsSchema,
};