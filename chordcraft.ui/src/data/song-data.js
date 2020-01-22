import axios from 'axios';

const baseUrl = 'https://localhost:44301/song';

const getSongs = () => new Promise((resolve, reject) => {
  axios.get(baseUrl)
    .then((response) => resolve(response.data))
    .catch(error => reject(error));
});

export default {
  getSongs,
};
