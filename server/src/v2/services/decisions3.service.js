const { List, Map, Range, Repeat } = require('immutable');

const getFeatureProbabilityDistributions = featureSizes => featureSizes.map(
    featureSize => List(Repeat(1 / featureSize, featureSize))
);

const getFeatureConfidence = featureDistribution => Math.max(...featureDistribution);

const getPersonProbability = (person, featureDistributions) => person.reduce(
    (subProduct, featureValue, index) => subProduct * featureDistributions.get(index).get(featureValue),
    1,
);

const f = (a, b) => List().concat(...a.map(d => b.map(e => List().concat(d, e))));
const cartesian = (a, b, ...c) => b ? cartesian(f(a, b), ...c) : a;

const generatePopulation = featureSizes => cartesian(...featureSizes.map(length => Range(0, length)));

const sigmoid = x => 1 / (1 + Math.exp(-x));

const sum = list => list.reduce((subtotal, x) => subtotal + x);

const normalise = list => list.map(value => value / sum(list));

const applySigmoidToDistribution = (distribution, isLessThan, midpoint) => normalise(
    distribution.map((probability, index) => 
        probability * sigmoid((index - midpoint) * (isLessThan ? -1 : 1) / distribution.size * 4.4)
    )
);

const pushDecisionToDistribution = (decision, featureDistributions) => {
    const feature = decision.get('feature');
    const isLessThan = decision.get('isLessThan');
    const midpoint = decision.get('midpoint');
    const distribution = featureDistributions.get(feature);
    
    return featureDistributions.set(
        feature, 
        applySigmoidToDistribution(distribution, isLessThan, midpoint),
    );
};

const calculateFeatureSizesFromDistribution = featureDistributions => featureDistributions.map(
    featureDistribution => featureDistribution.size
);

const rankPopulation = featureDistributions => {
    const featureSizes = calculateFeatureSizesFromDistribution(featureDistributions);
    const population = generatePopulation(featureSizes);
    return population.map(features => Map({ 
        features, 
        probability: getPersonProbability(features, featureDistributions),
    }));
};
// ).sort(({ probability: probabilityA }, { probability: probabilityB }) => probabilityB - probabilityA);

const getAllCombinationsForSingleFeature = (featureValues, featureSize, featureIndex) => {
    const matchingFeatureValues = Range(0, featureSize).map(featureValue => 
        featureValues.set(featureIndex, featureValue)
    );
    return matchingFeatureValues.filterNot(values => values.equals(featureValues));
};

const getValidMatches = (featuresA, featureSizes) => {
    const pairs = featureSizes.map((featureSize, featureIndex) =>
        getAllCombinationsForSingleFeature(featuresA, featureSize, featureIndex)
    );
    return pairs.flatten(1);
};

function unique(array) {
    const seen = {};
    return array.filter(item => seen.hasOwnProperty(item)
        ? false
        : (seen[item] = true)
    );
}

const generatePairs = (featureSizes) => {
    const population = generatePopulation(featureSizes);
    const pairs = population.map(
        features1 => getValidMatches(features1, featureSizes).map(
            features2 => List.of(features1, features2).sort()
        )
    );
    return unique(pairs.flatten(1));
};

const getPairRankings = (featureDistributions) => {
    const pairs = generatePairs(calculateFeatureSizesFromDistribution(featureDistributions));
    return pairs.map((pair) => {
        const probabilityA = getPersonProbability(pair.get(0), featureDistributions);
        const probabilityB = getPersonProbability(pair.get(1), featureDistributions);
        return  Map({ 
            pair,
            probability: probabilityA + probabilityB,
        });
    });
};

const getNewPairRankings = (featureDistributions, viewedFeatureValues) => {
    const rankedPairs = getPairRankings(featureDistributions);
    return rankedPairs.filter((rankedPair) => {
        const [featureValuesA, featureValuesB] = rankedPair.get('pair');
        return !(viewedFeatureValues.includes(featureValuesA) || viewedFeatureValues.includes(featureValuesB));
    });
};

module.exports = {
    getFeatureProbabilityDistributions,
    getFeatureConfidence,
    getPersonProbability,
    generatePopulation,
    pushDecisionToDistribution,
    rankPopulation,
    getValidMatches,
    generatePairs,
    getPairRankings,
    getNewPairRankings,
};