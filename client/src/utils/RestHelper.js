import axios from 'axios';

let instance;

// class to wrap axios calls/perform common REST actions (error handling, caching etc)
const handleError = (error) => {
  if (error.response) {
    if (error.response.status) {
      if (error.response.status === 511) {
        // eslint-disable-next-line no-console
        console.log('RestHelper had an error');
      }
    }
  }
  throw error;
};

export default class RestHelper {
  constructor() {
    // if we dont have an instance of this class, assign this one
    if (!instance) {
      instance = this;
    }
    return instance; // return this instance
  }

  /* eslint-disable class-methods-use-this */
  get(contextRoot, customOptions = {}) {
    return axios.get(contextRoot, customOptions).then(response => response)
      .catch(error => handleError(error));
  }

  post(contextRoot, payload) {
    return axios.post(contextRoot, payload).then(response => response)
      .catch(error => handleError(error));
  }

  put(contextRoot, payload) {
    return axios.put(contextRoot, payload).then(response => response)
      .catch(error => handleError(error));
  }

  delete(contextRoot) {
    return axios.delete(contextRoot).then(response => response)
      .catch(error => handleError(error));
  }
}
