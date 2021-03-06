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

const getPersonsWithNFeatures = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/persons/current`);
    const persons = response.data;
    return persons;
  } catch (err) {
    throw err;
  }
};

const getChoices = async (body) => {
  try {
    const response = await axios.post(`${origin}/api/v2/decisions/`, body);
    if (response.data.choices.length > 0) {
      const { decisions, viewedPeople } = response.data.choices[0].nextInput;
      savedData = {
        username: body.username,
        decisions: decisions.slice(1, decisions.length - 1),
        viewedPeople,
      };
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

const getPersonUrls = async () => {
  const urls = await axios.get(`${origin}/api/v1/persons/urls`);
  return urls;
};

const postUser = async () => {
  const username = await axios.post(`${origin}/api/v1/users`);
  return username;
};

const deleteUser = async (username) => {
  await axios.delete(`${origin}/api/v1/users`, { data: { username } });
};

const postVisualiserSetting = async (body) => {
  await axios.post(`${origin}/api/v2/visualiser/settings`, body);
};

const postCurrentUser = async (username) => {
  await axios.post(`${origin}/api/v2/visualiser/currentUser`, { username });
};

const getAllUsers = async () => {
  const allUsers = axios.get(`${origin}/api/v2/visualiser/users`);
  return allUsers;
};

export default {
  postStatistics,
  getPerson,
  getPersonsWithNFeatures,
  getChoices,
  getTree,
  getPersonUrls,
  postUser,
  deleteUser,
  postVisualiserSetting,
  postCurrentUser,
  getAllUsers,
};
