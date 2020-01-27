import axios from 'axios';

const baseUrl = 'https://localhost:44301/lyric';

const getSongLyrics = (songId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${songId}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

export default { getSongLyrics };