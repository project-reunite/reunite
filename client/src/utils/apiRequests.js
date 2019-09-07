import axios from 'axios';
import config from '../config';

const { origin } = config;

let savedData = { viewedPeople: [], decisions: [] };

const postStatistics = (personId) => {
  axios.post(`${origin}/api/v2/statistics/`, { ...savedData, personId });
};

const getPerson = async (id) => {
  try {
    const response = await axios.get(`${origin}/api/v1/persons/${id}`);
    return response;
  } catch (err) {
    throw err;
  }
};

const getChoices = async (body) => {
  try {
    const response = await axios.post(`${origin}/api/v2/decisions/`, body);
    if (response.data.choices.length > 0) {
      const { decisions, viewedPeople } = response.data.choices[0].nextInput;
      savedData = { decisions: decisions.slice(1, decisions.length - 1), viewedPeople };
    }
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
  postStatistics,
  getPerson,
  getChoices,
  getTree,
};
