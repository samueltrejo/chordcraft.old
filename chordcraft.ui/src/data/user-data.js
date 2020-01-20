import axios from 'axios';

const baseUrl = 'https://localhost:44301/user';

const getByUid = (uid) => axios.get(`${baseUrl}/${uid}`);
const register = (user) => axios.post(baseUrl, user);

export default {
  getByUid,
  register
};
