import axios from 'axios';

const baseUrl = 'https://localhost:44301/user';

const getByUid = (uid) => axios.get(`${baseUrl}/${uid}`);

export default {getByUid};
