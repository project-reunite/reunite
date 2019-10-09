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

const dbConfigs = {
    local: 'http://localhost:5984',
    cloud: {
        account: process.env.DB_ACCOUNT,
        password: process.env.DB_PASSWORD,
        maxAttempt: 5,
        plugins: [
            {
                retry: { retryErrors: false, retryStatusCodes: [ 429 ] },
            },
        ],
    },
};

const DB_LOCATION = 'cloud';
console.log(`DB_LOCATION: ${DB_LOCATION}`);

const dbConfig = dbConfigs[DB_LOCATION];

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
    dbConfig,
};
