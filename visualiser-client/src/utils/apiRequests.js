import axios from 'axios';
import config from '../config';
import { shuffleArray } from './util-functions';

const { origin } = config;

const getPersonUrls = async () => {
  const urls = await axios.get(`${origin}/api/v1/persons/urls`);
  shuffleArray(urls.data)
  return urls
};

export default {
  getPersonUrls,
};
