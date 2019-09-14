const port = process.env.PORT || 9100;

// For debug
// console.log('process.env');
// console.log(process.env);
// console.log('port', port);

// In IBM Cloud Foundry, process.env = { NODE_ENV: 'production', PUBLIC_URL, '.' }
// const inCloudEnv = (process.env.NODE_ENV === 'production') && !!process.env.PUBLIC_URL;
// const origin = inCloudEnv ? 'https://reunite.eu-gb.cf.appdomain.cloud' : `http://localhost:${port}`;
const origin = `http://localhost:${port}`;
// const origin = 'https://reunite.eu-gb.cf.appdomain.cloud';

const numPhotosInTotal = 128;

module.exports = {
  origin,
  numPhotosInTotal,
};
