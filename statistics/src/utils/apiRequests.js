import axios from 'axios';
import config from '../config';

const { origin } = config;

const getStatistics = async (timeFrom, username) => {
  try {
    const response = await axios.get(`${origin}/api/v2/statistics`);
    // const response = await axios.get(`${origin}/api/v2/statistics?time_from=${timeFrom}&username=${username}`);
    const stats = response.data.docs;
    return stats;
  } catch (err) {
    throw err;
  }
};

export default {
  getStatistics,
};
