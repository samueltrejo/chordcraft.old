import axios from 'axios';

const baseUrl = 'https://localhost:44301/chord';

const chords = {
  a: { id: 0, name: 'A', root: 1, quality: '', songId: 0, note1: 5, note2: 8, note3: null },
  ab: { id: 0, name: 'A#', root: 2, quality: '', songId: 0, note1: 6, note2: 9, note3: null },
  b: { id: 0, name: 'B', root: 3, quality: '', songId: 0, note1: 7, note2: 10, note3: null },
  c: { id: 0, name: 'C', root: 4, quality: '', songId: 0, note1: 8, note2: 11, note3: null },
  cb: { id: 0, name: 'C#', root: 5, quality: '', songId: 0, note1: 9, note2: 12, note3: null },
  d: { id: 0, name: 'D', root: 6, quality: '', songId: 0, note1: 10, note2: 1, note3: null },
  db: { id: 0, name: 'D#', root: 7, quality: '', songId: 0, note1: 11, note2: 2, note3: null },
  e: { id: 0, name: 'E', root: 8, quality: '', songId: 0, note1: 12, note2: 3, note3: null },
  f: { id: 0, name: 'F', root: 9, quality: '', songId: 0, note1: 1, note2: 4, note3: null },
  fb: { id: 0, name: 'F#', root: 10, quality: '', songId: 0, note1: 2, note2: 5, note3: null },
  g: { id: 0, name: 'G', root: 11, quality: '', songId: 0, note1: 3, note2: 6, note3: null },
  gb:{ id: 0, name: 'G#', root: 12, quality: '', songId: 0, note1: 4, note2: 7, note3: null },
  am: { id: 0, name: 'Am', root: 1, quality: 'm', songId: 0, note1: 4, note2: 8, note3: null },
  abm: { id: 0, name: 'A#m', root: 2, quality: 'm', songId: 0, note1: 5, note2: 9, note3: null },
  bm: { id: 0, name: 'Bm', root: 3, quality: 'm', songId: 0, note1: 6, note2: 10, note3: null },
  cm: { id: 0, name: 'Cm', root: 4, quality: 'm', songId: 0, note1: 7, note2: 11, note3: null },
  cbm: { id: 0, name: 'C#m', root: 5, quality: 'm', songId: 0, note1: 8, note2: 12, note3: null },
  dm: { id: 0, name: 'Dm', root: 6, quality: 'm', songId: 0, note1: 9, note2: 1, note3: null },
  dbm: { id: 0, name: 'D#m', root: 7, quality: 'm', songId: 0, note1: 10, note2: 2, note3: null },
  em: { id: 0, name: 'Em', root: 8, quality: 'm', songId: 0, note1: 11, note2: 3, note3: null },
  fm: { id: 0, name: 'Fm', root: 9, quality: 'm', songId: 0, note1: 12, note2: 4, note3: null },
  fbm: { id: 0, name: 'F#m', root: 10, quality: 'm', songId: 0, note1: 1, note2: 5, note3: null },
  gm: { id: 0, name: 'Gm', root: 11, quality: 'm', songId: 0, note1: 2, note2: 6, note3: null },
  gbm: { id: 0, name: 'G#m', root: 12, quality: 'm', songId: 0, note1: 3, note2: 7, note3: null },
  a5: { id: 0, name: 'A5', root: 1, quality: '5', songId: 0, note1: 5, note2: null, note3: null },
  ab5: { id: 0, name: 'A#5', root: 2, quality: '5', songId: 0, note1: 6, note2: null, note3: null },
  b5: { id: 0, name: 'B5', root: 3, quality: '5', songId: 0, note1: 7, note2: null, note3: null },
  c5: { id: 0, name: 'C5', root: 4, quality: '5', songId: 0, note1: 8, note2: null, note3: null },
  cb5: { id: 0, name: 'C#5', root: 5, quality: '5', songId: 0, note1: 9, note2: null, note3: null },
  d5: { id: 0, name: 'D5', root: 6, quality: '5', songId: 0, note1: 10, note2: null, note3: null },
  db5: { id: 0, name: 'D#5', root: 7, quality: '5', songId: 0, note1: 11, note2: null, note3: null },
  e5: { id: 0, name: 'E5', root: 8, quality: '5', songId: 0, note1: 12, note2: null, note3: null },
  f5: { id: 0, name: 'F5', root: 9, quality: '5', songId: 0, note1: 1, note2: null, note3: null },
  fb5: { id: 0, name: 'F#5', root: 10, quality: '5', songId: 0, note1: 2, note2: null, note3: null },
  g5: { id: 0, name: 'G5', root: 11, quality: '5', songId: 0, note1: 3, note2: null, note3: null },
  gb5: { id: 0, name: 'G#5', root: 12, quality: '5', songId: 0, note1: 4, note2: null, note3: null },
  a6: { id: 0, name: 'A6', root: 1, quality: '', songId: 0, note1: 5, note2: 8, note3: 10 },
  ab6: { id: 0, name: 'A#6', root: 2, quality: '', songId: 0, note1: 6, note2: 9, note3: 11 },
  b6: { id: 0, name: 'B6', root: 3, quality: '', songId: 0, note1: 7, note2: 10, note3: 12 },
  c6: { id: 0, name: 'C6', root: 4, quality: '', songId: 0, note1: 8, note2: 11, note3: 1 },
  cb6: { id: 0, name: 'C#6', root: 5, quality: '', songId: 0, note1: 9, note2: 12, note3: 2 },
  d6: { id: 0, name: 'D6', root: 6, quality: '', songId: 0, note1: 10, note2: 1, note3: 3 },
  db6: { id: 0, name: 'D#6', root: 7, quality: '', songId: 0, note1: 11, note2: 2, note3: 4 },
  e6: { id: 0, name: 'E6', root: 8, quality: '', songId: 0, note1: 12, note2: 3, note3: 5 },
  f6: { id: 0, name: 'F6', root: 9, quality: '', songId: 0, note1: 1, note2: 4, note3: 6 },
  fb6: { id: 0, name: 'F#6', root: 10, quality: '', songId: 0, note1: 2, note2: 5, note3: 7 },
  g6: { id: 0, name: 'G6', root: 11, quality: '', songId: 0, note1: 3, note2: 6, note3: 8 },
  gb6: { id: 0, name: 'G#6', root: 12, quality: '', songId: 0, note1: 4, note2: 7, note3: 9 },
  am6: { id: 0, name: 'Am6', root: 1, quality: '', songId: 0, note1: 4, note2: 8, note3: 10 },
  abm6: { id: 0, name: 'A#m6', root: 2, quality: '', songId: 0, note1: 5, note2: 9, note3: 11 },
  bm6: { id: 0, name: 'Bm6', root: 3, quality: '', songId: 0, note1: 6, note2: 10, note3: 12 },
  cm6: { id: 0, name: 'Cm6', root: 4, quality: '', songId: 0, note1: 7, note2: 11, note3: 1 },
  cbm6: { id: 0, name: 'C#m6', root: 5, quality: '', songId: 0, note1: 8, note2: 12, note3: 2 },
  dm6: { id: 0, name: 'Dm6', root: 6, quality: '', songId: 0, note1: 9, note2: 1, note3: 3 },
  dbm6: { id: 0, name: 'D#m6', root: 7, quality: '', songId: 0, note1: 10, note2: 2, note3: 4 },
  em6: { id: 0, name: 'Em6', root: 8, quality: '', songId: 0, note1: 11, note2: 3, note3: 5 },
  fm6: { id: 0, name: 'Fm6', root: 9, quality: '', songId: 0, note1: 12, note2: 4, note3: 6 },
  fbm6: { id: 0, name: 'F#m6', root: 10, quality: '', songId: 0, note1: 1, note2: 5, note3: 7 },
  gm6: { id: 0, name: 'Gm6', root: 11, quality: '', songId: 0, note1: 2, note2: 6, note3: 8 },
  gbm6: { id: 0, name: 'G#m6', root: 12, quality: '', songId: 0, note1: 3, note2: 7, note3: 9 },
  a7: { id: 0, name: 'A7', root: 1, quality: '', songId: 0, note1: 5, note2: 8, note3: 11 },
  ab7: { id: 0, name: 'A#7', root: 2, quality: '', songId: 0, note1: 6, note2: 9, note3: 12 },
  b7: { id: 0, name: 'B7', root: 3, quality: '', songId: 0, note1: 7, note2: 10, note3: 1 },
  c7: { id: 0, name: 'C7', root: 4, quality: '', songId: 0, note1: 8, note2: 11, note3: 2 },
  cb7: { id: 0, name: 'C#7', root: 5, quality: '', songId: 0, note1: 9, note2: 12, note3: 3 },
  d7: { id: 0, name: 'D7', root: 6, quality: '', songId: 0, note1: 10, note2: 1, note3: 4 },
  db7: { id: 0, name: 'D#7', root: 7, quality: '', songId: 0, note1: 11, note2: 2, note3: 5 },
  e7: { id: 0, name: 'E7', root: 8, quality: '', songId: 0, note1: 12, note2: 3, note3: 6 },
  f7: { id: 0, name: 'F7', root: 9, quality: '', songId: 0, note1: 1, note2: 4, note3: 7 },
  fb7: { id: 0, name: 'F#7', root: 10, quality: '', songId: 0, note1: 2, note2: 5, note3: 8 },
  g7: { id: 0, name: 'G7', root: 11, quality: '', songId: 0, note1: 3, note2: 6, note3: 9 },
  gb7: { id: 0, name: 'G#7', root: 12, quality: '', songId: 0, note1: 4, note2: 7, note3: 10 },
  am7: { id: 0, name: 'Am7', root: 1, quality: 'm', songId: 0, note1: 4, note2: 8, note3: 11 },
  abm7: { id: 0, name: 'A#m7', root: 2, quality: 'm', songId: 0, note1: 5, note2: 9, note3: 12 },
  bm7: { id: 0, name: 'Bm7', root: 3, quality: 'm', songId: 0, note1: 6, note2: 10, note3: 1 },
  cm7: { id: 0, name: 'Cm7', root: 4, quality: 'm', songId: 0, note1: 7, note2: 11, note3: 2 },
  cbm7: { id: 0, name: 'C#m7', root: 5, quality: 'm', songId: 0, note1: 8, note2: 12, note3: 3 },
  dm7: { id: 0, name: 'Dm7', root: 6, quality: 'm', songId: 0, note1: 9, note2: 1, note3: 4 },
  dbm7: { id: 0, name: 'D#m7', root: 7, quality: 'm', songId: 0, note1: 10, note2: 2, note3: 5 },
  em7: { id: 0, name: 'Em7', root: 8, quality: 'm', songId: 0, note1: 11, note2: 3, note3: 6 },
  fm7: { id: 0, name: 'Fm7', root: 9, quality: 'm', songId: 0, note1: 12, note2: 4, note3: 7 },
  fbm7: { id: 0, name: 'F#m7', root: 10, quality: 'm', songId: 0, note1: 1, note2: 5, note3: 8 },
  gm7: { id: 0, name: 'Gm7', root: 11, quality: 'm', songId: 0, note1: 2, note2: 6, note3: 9 },
  gbm7: { id: 0, name: 'G#m7', root: 12, quality: 'm', songId: 0, note1: 3, note2: 7, note3: 10 },
  asus2: { id: 0, name: 'Asus2', root: 1, quality: '', songId: 0, note1: 3, note2: 8, note3: null },
  absus2: { id: 0, name: 'A#sus2', root: 2, quality: '', songId: 0, note1: 4, note2: 9, note3: null },
  bsus2: { id: 0, name: 'Bsus2', root: 3, quality: '', songId: 0, note1: 5, note2: 10, note3: null },
  csus2: { id: 0, name: 'Csus2', root: 4, quality: '', songId: 0, note1: 6, note2: 11, note3: null },
  cbsus2: { id: 0, name: 'C#sus2', root: 5, quality: '', songId: 0, note1: 7, note2: 12, note3: null },
  dsus2: { id: 0, name: 'Dsus2', root: 6, quality: '', songId: 0, note1: 8, note2: 1, note3: null },
  dbsus2: { id: 0, name: 'D#sus2', root: 7, quality: '', songId: 0, note1: 9, note2: 2, note3: null },
  esus2: { id: 0, name: 'Esus2', root: 8, quality: '', songId: 0, note1: 10, note2: 3, note3: null },
  fsus2: { id: 0, name: 'Fsus2', root: 9, quality: '', songId: 0, note1: 11, note2: 4, note3: null },
  fbsus2: { id: 0, name: 'F#sus2', root: 10, quality: '', songId: 0, note1: 12, note2: 5, note3: null },
  gsus2: { id: 0, name: 'Gsus2', root: 11, quality: '', songId: 0, note1: 1, note2: 6, note3: null },
  gbsus2: { id: 0, name: 'G#sus2', root: 12, quality: '', songId: 0, note1: 2, note2: 7, note3: null },
  asus4: { id: 0, name: 'Asus4', root: 1, quality: '', songId: 0, note1: 6, note2: 8, note3: null },
  absus4: { id: 0, name: 'A#sus4', root: 2, quality: '', songId: 0, note1: 7, note2: 9, note3: null },
  bsus4: { id: 0, name: 'Bsus4', root: 3, quality: '', songId: 0, note1: 8, note2: 10, note3: null },
  csus4: { id: 0, name: 'Csus4', root: 4, quality: '', songId: 0, note1: 9, note2: 11, note3: null },
  cbsus4: { id: 0, name: 'C#sus4', root: 5, quality: '', songId: 0, note1: 10, note2: 12, note3: null },
  dsus4: { id: 0, name: 'Dsus4', root: 6, quality: '', songId: 0, note1: 11, note2: 1, note3: null },
  dbsus4: { id: 0, name: 'D#sus4', root: 7, quality: '', songId: 0, note1: 12, note2: 2, note3: null },
  esus4: { id: 0, name: 'Esus4', root: 8, quality: '', songId: 0, note1: 1, note2: 3, note3: null },
  fsus4: { id: 0, name: 'Fsus4', root: 9, quality: '', songId: 0, note1: 2, note2: 4, note3: null },
  fbsus4: { id: 0, name: 'F#sus4', root: 10, quality: '', songId: 0, note1: 3, note2: 5, note3: null },
  gsus4: { id: 0, name: 'Gsus4', root: 11, quality: '', songId: 0, note1: 4, note2: 6, note3: null },
  gbsus4: { id: 0, name: 'G#sus4', root: 12, quality: '', songId: 0, note1: 5, note2: 7, note3: null },
  adim: { id: 0, name: 'Adim', root: 1, quality: '', songId: 0, note1: 4, note2: 7, note3: null },
  abdim: { id: 0, name: 'A#dim', root: 2, quality: '', songId: 0, note1: 5, note2: 8, note3: null },
  bdim: { id: 0, name: 'Bdim', root: 3, quality: '', songId: 0, note1: 6, note2: 9, note3: null },
  cdim: { id: 0, name: 'Cdim', root: 4, quality: '', songId: 0, note1: 7, note2: 10, note3: null },
  cbdim: { id: 0, name: 'C#dim', root: 5, quality: '', songId: 0, note1: 8, note2: 11, note3: null },
  ddim: { id: 0, name: 'Ddim', root: 6, quality: '', songId: 0, note1: 9, note2: 12, note3: null },
  dbdim: { id: 0, name: 'D#dim', root: 7, quality: '', songId: 0, note1: 10, note2: 1, note3: null },
  edim: { id: 0, name: 'Edim', root: 8, quality: '', songId: 0, note1: 11, note2: 2, note3: null },
  fdim: { id: 0, name: 'Fdim', root: 9, quality: '', songId: 0, note1: 12, note2: 3, note3: null },
  fbdim: { id: 0, name: 'F#dim', root: 10, quality: '', songId: 0, note1: 1, note2: 4, note3: null },
  gdim: { id: 0, name: 'Gdim', root: 11, quality: '', songId: 0, note1: 2, note2: 5, note3: null },
  gbdim: { id: 0, name: 'G#dim', root: 12, quality: '', songId: 0, note1: 3, note2: 6, note3: null },
  aaug: { id: 0, name: 'Aaug', root: 1, quality: '', songId: 0, note1: 5, note2: 9, note3: null },
  abaug: { id: 0, name: 'A#aug', root: 2, quality: '', songId: 0, note1: 6, note2: 10, note3: null },
  baug: { id: 0, name: 'Baug', root: 3, quality: '', songId: 0, note1: 7, note2: 11, note3: null },
  caug: { id: 0, name: 'Caug', root: 4, quality: '', songId: 0, note1: 8, note2: 12, note3: null },
  cbaug: { id: 0, name: 'C#aug', root: 5, quality: '', songId: 0, note1: 9, note2: 1, note3: null },
  daug: { id: 0, name: 'Daug', root: 6, quality: '', songId: 0, note1: 10, note2: 2, note3: null },
  dbaug: { id: 0, name: 'D#aug', root: 7, quality: '', songId: 0, note1: 11, note2: 3, note3: null },
  eaug: { id: 0, name: 'Eaug', root: 8, quality: '', songId: 0, note1: 12, note2: 4, note3: null },
  faug: { id: 0, name: 'Faug', root: 9, quality: '', songId: 0, note1: 1, note2: 5, note3: null },
  fbaug: { id: 0, name: 'F#aug', root: 10, quality: '', songId: 0, note1: 2, note2: 6, note3: null },
  gaug: { id: 0, name: 'Gaug', root: 11, quality: '', songId: 0, note1: 3, note2: 7, note3: null },
  gbaug: { id: 0, name: 'G#aug', root: 12, quality: '', songId: 0, note1: 4, note2: 8, note3: null },
};

const getLocalChord = (chordName) => {
  return chords[chordName];
}

const getSongChords = (songId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/song/${songId}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
})

const getChordByName = (chordName) => {
  if (chords[chordName]) {
    return new Promise((resolve) => resolve(chords[chordName]));
  } else return new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/${chordName}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
  });
}

const postChord = (chord) => new Promise((resolve, reject) => {
  axios.post(baseUrl, chord)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
})


export default {
  getSongChords,
  getLocalChord,
  getChordByName,
  postChord,
}
