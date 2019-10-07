const port = process.env.PORT || 9100;

// For debug
// console.log('process.env');
// console.log(process.env);
// console.log('port', port);

const origins = {
  cloud: 'https://reunite.eu-gb.cf.appdomain.cloud',
  local: `http://localhost:${port}`,
  'local-network': `http://169.254.XXX.XX:${port}`, // Set this to your Private IP address
};

console.log('process.env.REACT_APP_SERVER_LOCATION');
console.log(process.env.REACT_APP_SERVER_LOCATION);

const serverLocation = process.env.REACT_APP_SERVER_LOCATION || 'local';

const origin = origins[serverLocation];

const numMissingPeople = 128;
const numPhotosViaExistingSolutions = numMissingPeople / 2;

module.exports = {
  origin,
  numMissingPeople,
  numPhotosViaExistingSolutions,
};
