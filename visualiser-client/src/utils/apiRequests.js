import axios from 'axios';
import config from '../config';

const { origin } = config;

const getPersonUrls = async () => {
  const urls = await axios.get(`${origin}/api/v1/persons/urls`);
  return urls
};

export default {
  getPersonUrls,
};
