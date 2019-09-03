const numberOfFeatures = 4;

const featureConfidence = [
    0.7,
    0.5,
    0.5,
    0.5,
];

const countChoicesByDecisions = (decisions) => {
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

const getPrediction = (previousDecisions) => {
    const counter = countChoicesByDecisions(previousDecisions);    
    const prediction = new Array(numberOfFeatures).fill(0.5);

    for(let i = 0; i < numberOfFeatures; i++) {
        prediction[i] *= (1 - featureConfidence[i]) ** Math.abs(counter[i]);
        if (counter[i] > 0) {
            prediction[i] = 1 - prediction[i];
        }
    }
    return prediction;
};

// const getLeastConfidentFeatureIndex = (prediction) => {
//     const arr = prediction.map(feature => Math.abs(feature - 0.5));
//     return arr.indexOf(Math.min(...arr));
// };

const addPadding = (n, numberOfFeatures) => {
    for(let i = n.length; i < numberOfFeatures; i++) {
        n = '0' + n;
    }
    return n;
};

const generatePeople = (numberOfFeatures) => {
    const list = [];
    for(let i = 0; i < 2 ** numberOfFeatures; i++) {
        let n = addPadding(parseInt(i, 10).toString(2), numberOfFeatures);

        list.push(n);
    }
    return list;
};


String.prototype.replaceAt=function(index, char) {
    var a = this.split('');
    a[index] = char;
    return a.join('');
};

const getBestPersons = (prediction, viewedPeople) => {
    let allPeople = generatePeople(numberOfFeatures);
    allPeople = allPeople.filter(person => !viewedPeople.includes(person));

    let ranks = [];
    allPeople.map(person => {

        let probability = 1;
        for(let i = 0; i < numberOfFeatures; i++) {
            let featureValue = person.charAt(i);
            probability *= 1 - Math.abs(prediction[i] - featureValue);
        }
        ranks.push({
            person,
            probability,
        });
    });
    ranks = ranks.sort((a,b) => (b.probability - a.probability));
    if (ranks.length === 0) return null;
    return [
        ranks[0],
        ranks[1],
    ];
};

const getBestPair = (prediction, feature, viewedPeople) => {
    
    viewedPeople = viewedPeople.map(person => person.replaceAt(feature, '*'));

    // prediction[feature] = 1;
    let allPeople = generatePeople(numberOfFeatures);
    allPeople = allPeople.map(person => person.replaceAt(feature, '*'));
    allPeople = allPeople.filter(person => !viewedPeople.includes(person));
    allPeople = [...new Set(allPeople)];
    let ranks = [];
    allPeople.map(person => {

        let probability = 1;
        for(let i = 0; i < numberOfFeatures; i++) {
            let featureValue = person.charAt(i);
            if(featureValue === '*') {
                continue;
            }
            console.log(prediction[i]);
            probability *= 1 - Math.abs(prediction[i] - featureValue);
        }
        ranks.push({
            person,
            probability,
        });
    });
    if (ranks.length === 0) {
        return null;
    }
    ranks = ranks.sort((a,b) => (b.probability - a.probability));
    const best = ranks[0].person;
    const choiceA = [...best];
    const choiceB = [...best];
    choiceA[feature] = 0;
    choiceB[feature] = 1;
    return { 
        probability: ranks[0].probability,
        choiceA,
        choiceB,
    };
};

const rankPairs = (prediction, viewedPeople) => {
    let pairs = [];
    for(let i = 0; i < numberOfFeatures; i++) {
        const pair = getBestPair(prediction, i, viewedPeople);
        if (pair) {
            pairs.push(pair);
        }
    }
    return pairs.sort((a,b) => (b.probability - a.probability));    
};

const getIsolatedFeature = (choiceA, choiceB) => {
    for(let i = 0; i < numberOfFeatures; i++) {
        if (choiceA[i] !== choiceB[i]) return i;
    }
};

const getNextDecision = (decisions, viewedPeople) => {
    let prediction = getPrediction(decisions);
    const pairs = rankPairs(prediction, viewedPeople);
    if (pairs.length === 0) {
        const best = getBestPersons(prediction, viewedPeople);
        if (!best) {
            return null;
        }
        const [choiceA, choiceB] = best;
        // console.log(choiceA);
        return {
            choices:  [
                {
                    persons_id: choiceA.person,
                    decisions,
                    viewedPeople: [
                        ...viewedPeople,
                        choiceA.person,
                        choiceB.person,
                    ],
                },
                {
                    persons_id: choiceB.person,
                    decisions,
                    viewedPeople: [
                        ...viewedPeople,
                        choiceA.person,
                        choiceB.person,
                    ],
                },
            ],  
        };        
    }
    const { choiceA, choiceB } = pairs[0];
    return {
        choices:  [
            {
                persons_id: choiceA.join(''),
                decisions: [
                    ...decisions, 
                    {
                        feature: getIsolatedFeature(choiceA, choiceB),
                        chosenValue: 0,
                    },
                ],
                viewedPeople: [
                    ...viewedPeople,
                    choiceA.join(''),
                    choiceB.join(''),
                ],
            },
            {
                persons_id: choiceB.join(''),
                decisions: [
                    ...decisions, 
                    {
                        feature: getIsolatedFeature(choiceA, choiceB),
                        chosenValue: 1,
                    },
                ],
                viewedPeople: [
                    ...viewedPeople,
                    choiceA.join(''),
                    choiceB.join(''),
                ],
            },
        ],  
    };        
};

module.exports = {
    getNextDecision,
};