const numberOfFeatures = 4;

const featureConfidence = [
    0.7,
    0.6,
    0.5,
    0.4,
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

const getLeastConfidentFeatureIndex = (prediction) => {
    const arr = prediction.map(feature => Math.abs(feature - 0.5));
    return arr.indexOf(Math.min(...arr));
};

const getNextDecision = (decisions) => {
    let prediction = getPrediction(decisions);
    const leastConfidentFeatureIndex = getLeastConfidentFeatureIndex(prediction);
    prediction = prediction.map(feature => Math.round(feature));
    const choiceA = [...prediction];
    const choiceB = [...prediction];
    choiceA[leastConfidentFeatureIndex] = 0;
    choiceB[leastConfidentFeatureIndex] = 1;
    return {
        choices:  [
            {
                personId: choiceA.join(''),
                decisions: [
                    ...decisions, 
                    {
                        feature: leastConfidentFeatureIndex,
                        chosenValue: 0,
                    },
                ],
            },
            {
                personId: choiceB.join(''),
                decisions: [
                    ...decisions, 
                    {
                        feature: leastConfidentFeatureIndex,
                        chosenValue: 1,
                    },
                ],
            },
        ],  
    };        
};

module.exports = {
    getNextDecision,
};