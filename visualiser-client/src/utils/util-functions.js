const seedrandom = require('seedrandom');

const rng = seedrandom('aGoodSeed'); // shuffle using the same seed to avoid disorientating users

function shuffleArray(originalArray) {
    const array = [...originalArray];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export {
  shuffleArray,
}
