const port = process.env.PORT || 9100;

// For debug
console.log('process.env')
console.log(process.env)
console.log('port', port)

// TODO: get this working in all environments
// In IBM Cloud Foundry, process.env = { NODE_ENV: 'production', PUBLIC_URL, '"."' }
// When built using `npm run build`, process.env also = { NODE_ENV: 'production', PUBLIC_URL, '"."' } This may be because in package.json I set "homepage": "."

// const inCloudEnv = (process.env.NODE_ENV === 'production') && (process.env.PUBLIC_URL === ".");
// const origin = inCloudEnv ? 'https://reunite.eu-gb.cf.appdomain.cloud' : `http://localhost:${port}`;

const origin = `http://localhost:${port}`;

module.exports = {
  origin,
};
