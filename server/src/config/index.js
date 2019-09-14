/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';

const numFeatures = 7;

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
    numFeatures,
};
