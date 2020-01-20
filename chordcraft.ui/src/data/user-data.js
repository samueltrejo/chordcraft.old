import axios from 'axios';

const baseUrl = 'https://localhost:44301/user';

const getByUid = (uid) => axios.get(`${baseUrl}/${uid}`);
const register = () => axios.post(baseUrl);

export default {
  getByUid,
  register
};
