import axios from 'axios';

const baseUrl = 'https://localhost:44301/song';

const getSongs = () => new Promise((resolve, reject) => {
  axios.get(baseUrl)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

const getMySongs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/uid`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

const getSong = (songId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${songId}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

const updateSong = (updatedSong, songId) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/${songId}`, updatedSong)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

const postSong = (newSong) => new Promise((resolve, reject) => {
  axios.post(baseUrl, newSong)
    .then(response => resolve(response))
    .catch(error => resolve(error));
});

const deleteSong = (songId) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/${songId}`)
    .then(response => resolve(response))
    .catch(error => reject(error));
})

export default {
  getSongs,
  getMySongs,
  getSong,
  updateSong,
  postSong,
  deleteSong,
};
