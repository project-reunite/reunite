const numberOfFeatures = 4;
const featureConfidence = [
    0.7,
    0.5,
    0.6,
    0.5,
];

const addPadding = (n, numberOfFeatures) => {
    for(let i = n.length; i < numberOfFeatures; i++) {
        n = '0' + n;
    }
    return n;
};

const generateAllPeople = (numberOfFeatures) => {
    const list = [];
    for(let i = 0; i < 2 ** numberOfFeatures; i++) {
        let n = addPadding(parseInt(i, 10).toString(2), numberOfFeatures);
        list.push(n);
    }
    return list;
};

const replaceCharAt = (string, char, index) => {
    string = string.split('');
    string[index] = char;
    return string.join('');
};

const generatePairsFromPeople = (people) => {
    let pairs = [];
    for(let i = 0; i < numberOfFeatures; i++) {
        pairs = pairs.concat(people.map(person => replaceCharAt(person, '*', i)));
    }
    return [...new Set(pairs)];
};

const generateAllPairs = (numberOfFeatures) => {
    const people = generateAllPeople(numberOfFeatures);
    return generatePairsFromPeople(people);
};

const countChoicesByDecisions = (decisions, numberOfFeatures) => {
    const counter = new Array(numberOfFeatures).fill(0);
    decisions.forEach(({ feature, chosenValue }) => {
        if (chosenValue) {
            counter[feature] += 1;
        } else {
            counter[feature] -= 1;
        }
    });
    return counter;
};

const getPrediction = (previousDecisions, numberOfFeatures) => {
    const counter = countChoicesByDecisions(previousDecisions, numberOfFeatures);    
    const prediction = new Array(numberOfFeatures).fill(0.5);

    for(let i = 0; i < numberOfFeatures; i++) {
        prediction[i] *= (1 - featureConfidence[i]) ** Math.abs(counter[i]);
        if (counter[i] > 0) {
            prediction[i] = 1 - prediction[i];
        }
    }
    return prediction;
};

const rankPerson = (person, prediction) => {
    let probability = 1;
    person = person.split('');
    for(let i = 0; i < prediction.length; i++) {
        probability *= 1 - Math.abs(prediction[i] - person[i]);
    }
    return {
        person: person.join(''),
        probability,
    };
};

const rankPair = (pair, prediction) => {
    let probability = 1;
    for(let i = 0; i < prediction.length; i++) {
        if (pair[i] === '*') {
            continue;
        }
        probability *= 1 - Math.abs(prediction[i] - pair[i]);
    }
    return {
        pair,
        probability,
    };
};

const getRemainingPeople = (viewedPeople) => {
    const allPeople = generateAllPeople(numberOfFeatures);
    return allPeople.filter(person => !viewedPeople.includes(person));
};

const getNextDecision = (decisions, viewedPeople) => {
    let pairs = generateAllPairs(numberOfFeatures);
    const viewedPairs = generatePairsFromPeople(viewedPeople);
    const prediction = getPrediction(decisions, numberOfFeatures);
    pairs = pairs.filter(pair => !viewedPairs.includes(pair));
    if (pairs.length === 0) {
        const people = getRemainingPeople(viewedPeople);
        let rankedPeople = people.map(person => rankPerson(person, prediction));
        rankedPeople = rankedPeople.sort((a,b) => (b.probability - a.probability));
        if(rankedPeople.length === 0) {
            return { choices: [] };
        } else {
            viewedPeople.push(rankedPeople[0].person);
            viewedPeople.push(rankedPeople[1].person);
            return {
                choices: [
                    {
                        personId: rankedPeople[0].person,
                        nextInput: {
                            decisions,
                            viewedPeople,
                        },
                    },
                    {
                        personId: rankedPeople[1].person,
                        nextInput: {
                            decisions,
                            viewedPeople,
                        },
                    },
                ],
            };
        }
    } else {
        pairs = pairs.sort((a,b) => (b - a));
        pairs = pairs.map(pair => rankPair(pair, prediction));
        pairs = pairs.sort((a,b) => (b.probability - a.probability));
        const best = pairs[0].pair;
        let choiceA = best.repeat(1);
        let choiceB = best.repeat(1);
        const featureChanged = best.indexOf('*');
        choiceA = replaceCharAt(choiceA, '0', featureChanged);
        choiceB = replaceCharAt(choiceB, '1', featureChanged);
        viewedPeople.push(choiceA);
        viewedPeople.push(choiceB);
        
        return {
            choices: [
                {
                    personId: choiceA,
                    nextInput: {
                        decisions: [
                            ...decisions,
                            {
                                feature: featureChanged,
                                chosenValue: 0,
                            },
                        ],
                        viewedPeople,
                    },
                },
                {
                    personId: choiceB,
                    nextInput: {
                        decisions: [
                            ...decisions,
                            {
                                feature: featureChanged,
                                chosenValue: 1,
                            },
                        ],
                        viewedPeople,
                    },
                },
            ],
        };
    }
};

module.exports = {
    getNextDecision,
};