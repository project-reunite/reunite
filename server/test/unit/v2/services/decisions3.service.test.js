const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const { Map, List } = require('immutable');

const chai = require('../../../setup/chai.setup');

chai.use(deepEqualInAnyOrder);
chai.use(require('chai-immutable'));

const { expect } = chai;
const { 
    getFeatureProbabilityDistributions,
    getFeatureConfidence,
    getPersonProbability,
    generatePopulation, 
    pushDecisionToDistribution,
    rankPopulation,
    getValidMatches: geAllValidPairs,
    generatePairs,
    getPairRankings,
    getNewPairRankings,
} = require('../../../../src/v2/services/decisions3.service');

const round = (num, decimalPlaces) => parseFloat(Math.round(num + `e+${decimalPlaces}`) + `e-${decimalPlaces}`);
const roundDistributions = distributions => distributions.map(distribution => distribution.map(val => round(val, 5)));
const roundRanking = rankings => rankings.map(ranking => ranking.set('probability', round(ranking.get('probability'), 5)));

describe('decisions3.service', function() {
    describe('get feature probability distributions', function() {
        it('[2]', function () {
            const actual = getFeatureProbabilityDistributions(List([2]));
            const expected = List.of(List.of(0.5, 0.5));
            expect(actual).to.equal(expected);
        });
        it('[2, 4]', function () {
            const actual = getFeatureProbabilityDistributions(List([2, 4]));
            const expected = List.of(
                List.of(0.5, 0.5),
                List.of(0.25, 0.25, 0.25, 0.25),
            );
            expect(actual).to.equal(expected);
        });
    });

    describe('get confidence value for a feature distribution', function () {
        it('[0.4, 0.6]', function () {
            expect(getFeatureConfidence(List.of(0.4, 0.6))).to.equal(0.6);
        });
    });

    describe('Rank confidence in person', function () {
        it('0110', function () {
            const person = List.of(0, 1, 1, 0);
            const featureDistributions = List.of(
                List.of(0.7, 0.3),
                List.of(0.4, 0.6),
                List.of(0.5, 0.5),
                List.of(0.2, 0.8),
            );
            expect(getPersonProbability(person, featureDistributions)).to.be.closeTo(0.042, 0.001);
        });
    });

    describe('generate all people', function() {
        it('[2, 4]', function() {
            expect(generatePopulation(List.of(2, 4))).to.eql(List.of(
                List.of(0, 0),
                List.of(0, 1),
                List.of(0, 2),
                List.of(0, 3),
                List.of(1, 0),
                List.of(1, 1),
                List.of(1, 2),
                List.of(1, 3),
            ));
        });
    });

    describe('Shift feature distribution', function() {
        it('no side effects', function() {
            const featureDistributions = getFeatureProbabilityDistributions(List.of(2));
            const decision = Map({
                feature: 0,
                isLessThan: true,
                midpoint: 0.5,
            });

            pushDecisionToDistribution(decision, featureDistributions);
            expect(featureDistributions).to.equal(List.of(
                List.of(0.5, 0.5),
            ));
        });
        
        it('2 contradicting decisions cancel', function() {
            const decision1 = Map({
                feature: 0,
                isLessThan: true,
                midpoint: 0.5,
            });
            const decision2 = decision1.set('isLessThan', false);

            let featureDistributions = getFeatureProbabilityDistributions(List.of(2));
            featureDistributions = pushDecisionToDistribution(decision1, featureDistributions);
            featureDistributions = pushDecisionToDistribution(decision2, featureDistributions);
            expect(featureDistributions).to.equal(List.of(
                List.of(0.5, 0.5),
            ));
        });
        it('1 binary feature, < 0.5', function() {
            const featureDistributions = getFeatureProbabilityDistributions(List.of(2));
            const decision = Map({
                feature: 0,
                isLessThan: true,
                midpoint: 0.5,
            });
            
            const actual = pushDecisionToDistribution(decision, featureDistributions);
            expect(roundDistributions(actual)).to.equal(List.of(
                List.of(0.75026, 0.24974),
            ));
        });
        it('4 features, < 1.5', function() {
            const featureDistributions = getFeatureProbabilityDistributions(List.of(4));
            const decision = Map({
                feature: 0,
                isLessThan: false,
                midpoint: 1.5,
            });
            
            const actual = pushDecisionToDistribution(decision, featureDistributions);
            expect(roundDistributions(actual)).to.equal(List.of(
                List.of(0.08055, 0.18293, 0.31707, 0.41945), 
            ));
        });
    });
    
    describe('rank population', function() {
        it('1 binary, 1 Quaternary feature', function() {
            const decision0 = Map({
                feature: 0,
                isLessThan: false,
                midpoint: 0.5,
            });
            const decision1 = Map({
                feature: 1,
                isLessThan: true,
                midpoint: 1.5,
            });
            
            let featureDistributions = getFeatureProbabilityDistributions(List.of(2, 4));
            featureDistributions = pushDecisionToDistribution(decision0, featureDistributions);
            featureDistributions = pushDecisionToDistribution(decision1, featureDistributions);
            const actual = rankPopulation(featureDistributions);

            expect(roundRanking(actual)).to.equal(List.of(
                Map({ features: List.of(0, 0), probability: 0.10475 }),
                Map({ features: List.of(0, 1), probability: 0.07918 }),
                Map({ features: List.of(0, 2), probability: 0.04569 }),
                Map({ features: List.of(0, 3), probability: 0.02012 }),
                Map({ features: List.of(1, 0), probability: 0.31469 }),
                Map({ features: List.of(1, 1), probability: 0.23788 }),
                Map({ features: List.of(1, 2), probability: 0.13725 }),
                Map({ features: List.of(1, 3), probability: 0.06044 }),
            ));
        });
    });

    describe('generate valid pairs for a feature set', function() {
        it('features: [0, 0], feature sizes: [2, 3]', function() {
            expect(geAllValidPairs(List.of(0, 0), List.of(2, 3))).to.equal(List.of(
                List.of(1, 0),
                List.of(0, 1),
                List.of(0, 2),
            ));
        });
    });

    describe('generate pairs', function() {
        it('[2, 4]', function() {
            const actual = generatePairs(List.of(2, 4));

            const expected = List.of(
                List.of(List.of(0, 0), List.of(1, 0)),
                List.of(List.of(0, 1), List.of(1, 1)),
                List.of(List.of(0, 2), List.of(1, 2)),
                List.of(List.of(0, 3), List.of(1, 3)),
                List.of(List.of(0, 0), List.of(0, 1)),
                List.of(List.of(0, 0), List.of(0, 2)),
                List.of(List.of(0, 0), List.of(0, 3)),
                List.of(List.of(0, 1), List.of(0, 2)),
                List.of(List.of(0, 1), List.of(0, 3)),
                List.of(List.of(0, 2), List.of(0, 3)),
                List.of(List.of(1, 0), List.of(1, 1)),
                List.of(List.of(1, 0), List.of(1, 2)),
                List.of(List.of(1, 0), List.of(1, 3)),
                List.of(List.of(1, 1), List.of(1, 2)),
                List.of(List.of(1, 1), List.of(1, 3)),
                List.of(List.of(1, 2), List.of(1, 3)),
            );

            expected.forEach(expectedPair => {
                expect(actual).to.include(expectedPair);
            });
        });
    });

    describe('generate pair rankings', function() {
        it('[2, 3]', function() {
            let featureDistributions = getFeatureProbabilityDistributions(List.of(2, 3));
            const decision0 = Map({
                feature: 0,
                isLessThan: false,
                midpoint: 0.5,
            });
            const decision1 = Map({
                feature: 1,
                isLessThan: true,
                midpoint: 1,
            });

            featureDistributions = pushDecisionToDistribution(decision0, featureDistributions);
            featureDistributions = pushDecisionToDistribution(decision1, featureDistributions);

            const expected = List.of(
                Map({ pair: List.of(List.of(0, 0), List.of(1, 0)), probability: 0.54170 }),
                Map({ pair: List.of(List.of(0, 0), List.of(0, 1)), probability: 0.21853 }),
                Map({ pair: List.of(List.of(0, 0), List.of(0, 2)), probability: 0.16649 }),
                Map({ pair: List.of(List.of(0, 1), List.of(1, 1)), probability: 0.33333 }),
                Map({ pair: List.of(List.of(0, 1), List.of(0, 2)), probability: 0.11446 }),
                Map({ pair: List.of(List.of(0, 2), List.of(1, 2)), probability: 0.12497 }),
                Map({ pair: List.of(List.of(1, 0), List.of(1, 1)), probability: 0.65650 }),
                Map({ pair: List.of(List.of(1, 0), List.of(1, 2)), probability: 0.50017 }),
                Map({ pair: List.of(List.of(1, 1), List.of(1, 2)), probability: 0.34384 }),
            );

            const actual = getPairRankings(featureDistributions);
            expect(roundRanking(actual)).to.equal(expected);
        });

        it('[2, 3] with filtered out viewed featuresets', function() {
            let featureDistributions = getFeatureProbabilityDistributions(List.of(2, 3));
            const decision0 = Map({
                feature: 0,
                isLessThan: false,
                midpoint: 0.5,
            });
            const decision1 = Map({
                feature: 1,
                isLessThan: true,
                midpoint: 1,
            });

            featureDistributions = pushDecisionToDistribution(decision0, featureDistributions);
            featureDistributions = pushDecisionToDistribution(decision1, featureDistributions);
            
            const viewedFeatureValues = List.of(
                List.of(0, 1),
                List.of(1, 0),
            );

            const expected = List.of(
                Map({ pair: List.of(List.of(0, 0), List.of(0, 2)), probability: 0.16649 }),
                Map({ pair: List.of(List.of(0, 2), List.of(1, 2)), probability: 0.12497 }),
                Map({ pair: List.of(List.of(1, 1), List.of(1, 2)), probability: 0.34384 }),
            );

            const actual = getNewPairRankings(featureDistributions, viewedFeatureValues);

            expect(roundRanking(actual)).to.equal(expected);
        });
    });

    // describe('format data for response', function() {
    //     it('[2, 2] with no decisions so far', function() {
    //         const featureDistributions = getFeatureProbabilityDistributions(List.of(2, 3));

    //         const viewedPeople = [
    //             '00',
    //             '10',
    //         ];
    //         const expected = Map({
    //             skipInput: Map({
    //                 decisions: [],
    //                 viewedPeople,
    //             }),
    //             choices: List.of(
    //                 Map({
    //                     personId: '00',
    //                     nextInput: Map({
    //                         decisions: List.of(
    //                             Map({
    //                                 feature: 0,
    //                                 chosenValue: 0,
    //                             }),
    //                         ),
    //                         viewedPeople,
    //                     }),
    //                 }),
    //                 Map({
    //                     personId: '10',
    //                     nextInput: Map({
    //                         decisions: List.of(
    //                             Map({
    //                                 feature: 0,
    //                                 chosenValue: 1,
    //                             }),
    //                         ),
    //                         viewedPeople,
    //                     }),
    //                 }),
    //             ),
    //         });
    //         expect().to.equal(expected);
    //     });
    // });
});
