import axios from 'axios';

const baseUrl = 'https://localhost:44301/user';

const getByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${uid}`)
    .then((response) => resolve(response.data))
    .catch(error => reject(error));
})
const register = () => new Promise((resolve, reject) => {
  axios.post(baseUrl)
    .then(response => resolve(response))
    .catch(error => reject(error));
})

export default {
  getByUid,
  register
};
