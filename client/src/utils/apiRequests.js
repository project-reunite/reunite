import axios from 'axios';

const getPerson = async (id) => {
  try {
    const response = await axios.get(`http://localhost:9100/api/v1/persons/${id}`);
    return response;
  } catch (err) {
    throw err;
  }
};

const getChoices = async (decisionId) => {
  try {
    const response = await axios.get(`http://localhost:9100/api/v1/decisions/${decisionId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

const getTree = async (queryString) => {
  try {
    const response = await axios.get(`http://localhost:9100/api/v1/trees?${queryString}`);
    return response;
  } catch (err) {
    throw err;
  }
};

export default {
  getPerson,
  getChoices,
  getTree,
};
