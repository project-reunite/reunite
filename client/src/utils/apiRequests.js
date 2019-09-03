import axios from 'axios';
import config from '../config';

const { origin } = config;

const getPerson = async (id) => {
  try {
    const response = await axios.get(`${origin}/api/v1/persons/${id}`);
    return response;
  } catch (err) {
    throw err;
  }
};

const getChoices = async (decisionId) => {
  try {
    const response = await axios.get(`${origin}/api/v1/decisions/${decisionId}`);
    return response;
  } catch (err) {
    throw err;
  }
};

const getTree = async (queryString) => {
  try {
    const response = await axios.get(`${origin}/api/v1/trees?${queryString}`);
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
