import axios from 'axios';

const baseUrl = 'https://localhost:44301/chord';

const baseChords = [
  { id: 0, name: 'A', root: 1, quality: '', songId: 0, note1: 5, note2: 8, note3: null },
  { id: 0, name: 'A#', root: 2, quality: '', songId: 0, note1: 6, note2: 9, note3: null },
  { id: 0, name: 'B', root: 3, quality: '', songId: 0, note1: 7, note2: 10, note3: null },
  { id: 0, name: 'C', root: 4, quality: '', songId: 0, note1: 8, note2: 11, note3: null },
  { id: 0, name: 'C#', root: 5, quality: '', songId: 0, note1: 9, note2: 12, note3: null },
  { id: 0, name: 'D', root: 6, quality: '', songId: 0, note1: 10, note2: 1, note3: null },
  { id: 0, name: 'D#', root: 7, quality: '', songId: 0, note1: 11, note2: 2, note3: null },
  { id: 0, name: 'E', root: 8, quality: '', songId: 0, note1: 12, note2: 3, note3: null },
  { id: 0, name: 'F', root: 9, quality: '', songId: 0, note1: 1, note2: 4, note3: null },
  { id: 0, name: 'F#', root: 10, quality: '', songId: 0, note1: 2, note2: 5, note3: null },
  { id: 0, name: 'G', root: 11, quality: '', songId: 0, note1: 3, note2: 6, note3: null },
  { id: 0, name: 'G#', root: 12, quality: '', songId: 0, note1: 4, note2: 7, note3: null },
  { id: 0, name: 'Am', root: 1, quality: '', songId: 0, note1: 4, note2: 8, note3: null },
  { id: 0, name: 'A#m', root: 2, quality: '', songId: 0, note1: 5, note2: 9, note3: null },
  { id: 0, name: 'Bm', root: 3, quality: '', songId: 0, note1: 6, note2: 10, note3: null },
  { id: 0, name: 'Cm', root: 4, quality: '', songId: 0, note1: 7, note2: 11, note3: null },
  { id: 0, name: 'C#m', root: 5, quality: '', songId: 0, note1: 8, note2: 12, note3: null },
  { id: 0, name: 'Dm', root: 6, quality: '', songId: 0, note1: 9, note2: 1, note3: null },
  { id: 0, name: 'D#m', root: 7, quality: '', songId: 0, note1: 10, note2: 2, note3: null },
  { id: 0, name: 'Em', root: 8, quality: '', songId: 0, note1: 11, note2: 3, note3: null },
  { id: 0, name: 'Fm', root: 9, quality: '', songId: 0, note1: 12, note2: 4, note3: null },
  { id: 0, name: 'F#m', root: 10, quality: '', songId: 0, note1: 1, note2: 5, note3: null },
  { id: 0, name: 'Gm', root: 11, quality: '', songId: 0, note1: 2, note2: 6, note3: null },
  { id: 0, name: 'G#m', root: 12, quality: '', songId: 0, note1: 3, note2: 7, note3: null }
];

// const specialChords = [
  // { id: 0, name: 'A', root: 1, quality: '', songId: 0, note1: 5, note2: 8, note3: null },
  // { id: 0, name: 'A#', root: 2, quality: '', songId: 0, note1: 6, note2: 9, note3: null },
  // { id: 0, name: 'B', root: 3, quality: '', songId: 0, note1: 7, note2: 10, note3: null },
  // { id: 0, name: 'C', root: 4, quality: '', songId: 0, note1: 8, note2: 11, note3: null },
  // { id: 0, name: 'C#', root: 5, quality: '', songId: 0, note1: 9, note2: 12, note3: null },
  // { id: 0, name: 'D', root: 6, quality: '', songId: 0, note1: 10, note2: 1, note3: null },
  // { id: 0, name: 'D#', root: 7, quality: '', songId: 0, note1: 11, note2: 2, note3: null },
  // { id: 0, name: 'E', root: 8, quality: '', songId: 0, note1: 12, note2: 3, note3: null },
  // { id: 0, name: 'F', root: 9, quality: '', songId: 0, note1: 1, note2: 4, note3: null },
  // { id: 0, name: 'F#', root: 10, quality: '', songId: 0, note1: 2, note2: 5, note3: null },
  // { id: 0, name: 'G', root: 11, quality: '', songId: 0, note1: 3, note2: 6, note3: null },
  // { id: 0, name: 'G#', root: 12, quality: '', songId: 0, note1: 4, note2: 7, note3: null },
  // { id: 0, name: 'Am', root: 1, quality: '', songId: 0, note1: 4, note2: 8, note3: null },
  // { id: 0, name: 'A#m', root: 2, quality: '', songId: 0, note1: 5, note2: 9, note3: null },
  // { id: 0, name: 'Bm', root: 3, quality: '', songId: 0, note1: 6, note2: 10, note3: null },
  // { id: 0, name: 'Cm', root: 4, quality: '', songId: 0, note1: 7, note2: 11, note3: null },
  // { id: 0, name: 'C#m', root: 5, quality: '', songId: 0, note1: 8, note2: 12, note3: null },
  // { id: 0, name: 'Dm', root: 6, quality: '', songId: 0, note1: 9, note2: 1, note3: null },
  // { id: 0, name: 'D#m', root: 7, quality: '', songId: 0, note1: 10, note2: 2, note3: null },
  // { id: 0, name: 'Em', root: 8, quality: '', songId: 0, note1: 11, note2: 3, note3: null },
  // { id: 0, name: 'Fm', root: 9, quality: '', songId: 0, note1: 12, note2: 4, note3: null },
  // { id: 0, name: 'F#m', root: 10, quality: '', songId: 0, note1: 1, note2: 5, note3: null },
  // { id: 0, name: 'Gm', root: 11, quality: '', songId: 0, note1: 2, note2: 6, note3: null },
  // { id: 0, name: 'G#m', root: 12, quality: '', songId: 0, note1: 3, note2: 7, note3: null }
// ]

const getChordByName = (chordName) => {
  const baseChordCheck = baseChords.find(chord => chord.name === chordName);
  if (baseChordCheck) {
    return new Promise((resolve) => resolve(baseChordCheck))
  }
  
  return new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${chordName}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
  });
}


export default {
  getChordByName,
}
