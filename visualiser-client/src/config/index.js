const port = process.env.PORT || 9100;

// In IBM Cloud Foundry, process.env = { NODE_ENV: 'production', PUBLIC_URL, '.' }
const inCloudEnv = (process.env.NODE_ENV === 'production') && !!process.env.PUBLIC_URL;
const origin = inCloudEnv ? 'https://reunite.eu-gb.cf.appdomain.cloud' : `http://localhost:${port}`;

module.exports = {
  origin,
};
