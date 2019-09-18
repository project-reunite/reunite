const seedrandom = require('seedrandom');

const rng = seedrandom('aGoodSeed'); // shuffle using the same seed to avoid disorientating users

const logError = (err) => {
    console.log({
        error: {
            name: err.name,
            message: err.message,
            // data: err.data,
        },
    });
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const shuffleArray = (originalArray) => {
    const array = deepCopy(originalArray);
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

module.exports = {
    logError,
    shuffleArray,
};
