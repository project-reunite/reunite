const { NUM_FEATURES } = require('../../config');
const { shuffleArray } = require('../../utils');
const { insertDocuments } = require('../../v1/services/database.service');

const addPadding = (n, numberOfFeatures) => {
    for(let i = n.length; i < numberOfFeatures; i++) {
        n = '0' + n;
    }
    return n;
};

const generatePersonIds = (numberOfFeatures) => {
    const list = [];
    for(let i = 0; i < 2 ** numberOfFeatures; i++) {
        const n = addPadding(parseInt(i, 10).toString(2), numberOfFeatures);
        list.push(n);
    }
    return list;
};

const generatePersonsFromIds = (id, name) => ({
    _id: id,
    name,
    age: 26 + (parseInt(id, 2) % 10),
    gender: id.charAt(0) === '1' ? 'Male' : 'Female',
    img_url: `/images/generated/7_features/lighter/low_res/${id}.png`,
});


const personIds = generatePersonIds(NUM_FEATURES);
const shuffledIds = shuffleArray(personIds);
const shuffledPeople = shuffledIds.map((id, index) => generatePersonsFromIds(id, index));

insertDocuments({
    database: 'persons_migrants',
    docs: shuffledPeople,
}).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
