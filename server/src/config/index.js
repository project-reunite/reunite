/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';

const NUM_FEATURES = 7;
const FEATURE_CONFIDENCE = [
    1,   // gender
    0.8, // skin tone
    0.7, // age
    0.5,
    0.5,
    0.5,
    0.5,
];

/* istanbul ignore next */
function determineLogLevel(env) {
    if (env === 'production' || env === 'staging') {
        return 'info';
    }
    return 'debug';
}

module.exports = {
    ...require(`./${env}`), // eslint-disable-line import/no-dynamic-require
    logLevel: determineLogLevel(env),
    env,
    NUM_FEATURES,
    FEATURE_CONFIDENCE,
};
