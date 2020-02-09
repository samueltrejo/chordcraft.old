import axios from 'axios';

const baseUrl = 'https://localhost:44301/chord';

const notes = {
    note1: new Audio('https://awiclass.monoame.com/pianosound/set/6.wav'),
    note2: new Audio('https://awiclass.monoame.com/pianosound/set/6.5.wav'),
    note3: new Audio('https://awiclass.monoame.com/pianosound/set/7.wav'),
    note4: new Audio('https://awiclass.monoame.com/pianosound/set/1.wav'),
    note5: new Audio('https://awiclass.monoame.com/pianosound/set/1.5.wav'),
    note6: new Audio('https://awiclass.monoame.com/pianosound/set/2.wav'),
    note7: new Audio('https://awiclass.monoame.com/pianosound/set/2.5.wav'),
    note8: new Audio('https://awiclass.monoame.com/pianosound/set/3.wav'),
    note9: new Audio('https://awiclass.monoame.com/pianosound/set/4.wav'),
    note10: new Audio('https://awiclass.monoame.com/pianosound/set/4.5.wav'),
    note11: new Audio('https://awiclass.monoame.com/pianosound/set/5.wav'),
    note12: new Audio('https://awiclass.monoame.com/pianosound/set/5.5.wav')
};

const chords = {
  a: { id: 0, name: 'A', root: 1, quality: '', songId: 0, note1: 5, note2: 8, note3: 0 },
  ab: { id: 0, name: 'A#', root: 2, quality: '', songId: 0, note1: 6, note2: 9, note3: 0 },
  b: { id: 0, name: 'B', root: 3, quality: '', songId: 0, note1: 7, note2: 10, note3: 0 },
  c: { id: 0, name: 'C', root: 4, quality: '', songId: 0, note1: 8, note2: 11, note3: 0 },
  cb: { id: 0, name: 'C#', root: 5, quality: '', songId: 0, note1: 9, note2: 12, note3: 0 },
  d: { id: 0, name: 'D', root: 6, quality: '', songId: 0, note1: 10, note2: 1, note3: 0 },
  db: { id: 0, name: 'D#', root: 7, quality: '', songId: 0, note1: 11, note2: 2, note3: 0 },
  e: { id: 0, name: 'E', root: 8, quality: '', songId: 0, note1: 12, note2: 3, note3: 0 },
  f: { id: 0, name: 'F', root: 9, quality: '', songId: 0, note1: 1, note2: 4, note3: 0 },
  fb: { id: 0, name: 'F#', root: 10, quality: '', songId: 0, note1: 2, note2: 5, note3: 0 },
  g: { id: 0, name: 'G', root: 11, quality: '', songId: 0, note1: 3, note2: 6, note3: 0 },
  gb:{ id: 0, name: 'G#', root: 12, quality: '', songId: 0, note1: 4, note2: 7, note3: 0 },
  am: { id: 0, name: 'Am', root: 1, quality: 'm', songId: 0, note1: 4, note2: 8, note3: 0 },
  abm: { id: 0, name: 'A#m', root: 2, quality: 'm', songId: 0, note1: 5, note2: 9, note3: 0 },
  bm: { id: 0, name: 'Bm', root: 3, quality: 'm', songId: 0, note1: 6, note2: 10, note3: 0 },
  cm: { id: 0, name: 'Cm', root: 4, quality: 'm', songId: 0, note1: 7, note2: 11, note3: 0 },
  cbm: { id: 0, name: 'C#m', root: 5, quality: 'm', songId: 0, note1: 8, note2: 12, note3: 0 },
  dm: { id: 0, name: 'Dm', root: 6, quality: 'm', songId: 0, note1: 9, note2: 1, note3: 0 },
  dbm: { id: 0, name: 'D#m', root: 7, quality: 'm', songId: 0, note1: 10, note2: 2, note3: 0 },
  em: { id: 0, name: 'Em', root: 8, quality: 'm', songId: 0, note1: 11, note2: 3, note3: 0 },
  fm: { id: 0, name: 'Fm', root: 9, quality: 'm', songId: 0, note1: 12, note2: 4, note3: 0 },
  fbm: { id: 0, name: 'F#m', root: 10, quality: 'm', songId: 0, note1: 1, note2: 5, note3: 0 },
  gm: { id: 0, name: 'Gm', root: 11, quality: 'm', songId: 0, note1: 2, note2: 6, note3: 0 },
  gbm: { id: 0, name: 'G#m', root: 12, quality: 'm', songId: 0, note1: 3, note2: 7, note3: 0 },
  a5: { id: 0, name: 'A5', root: 1, quality: '5', songId: 0, note1: 5, note2: 0, note3: 0 },
  ab5: { id: 0, name: 'A#5', root: 2, quality: '5', songId: 0, note1: 6, note2: 0, note3: 0 },
  b5: { id: 0, name: 'B5', root: 3, quality: '5', songId: 0, note1: 7, note2: 0, note3: 0 },
  c5: { id: 0, name: 'C5', root: 4, quality: '5', songId: 0, note1: 8, note2: 0, note3: 0 },
  cb5: { id: 0, name: 'C#5', root: 5, quality: '5', songId: 0, note1: 9, note2: 0, note3: 0 },
  d5: { id: 0, name: 'D5', root: 6, quality: '5', songId: 0, note1: 10, note2: 0, note3: 0 },
  db5: { id: 0, name: 'D#5', root: 7, quality: '5', songId: 0, note1: 11, note2: 0, note3: 0 },
  e5: { id: 0, name: 'E5', root: 8, quality: '5', songId: 0, note1: 12, note2: 0, note3: 0 },
  f5: { id: 0, name: 'F5', root: 9, quality: '5', songId: 0, note1: 1, note2: 0, note3: 0 },
  fb5: { id: 0, name: 'F#5', root: 10, quality: '5', songId: 0, note1: 2, note2: 0, note3: 0 },
  g5: { id: 0, name: 'G5', root: 11, quality: '5', songId: 0, note1: 3, note2: 0, note3: 0 },
  gb5: { id: 0, name: 'G#5', root: 12, quality: '5', songId: 0, note1: 4, note2: 0, note3: 0 },
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
  asus2: { id: 0, name: 'Asus2', root: 1, quality: '', songId: 0, note1: 3, note2: 8, note3: 0 },
  absus2: { id: 0, name: 'A#sus2', root: 2, quality: '', songId: 0, note1: 4, note2: 9, note3: 0 },
  bsus2: { id: 0, name: 'Bsus2', root: 3, quality: '', songId: 0, note1: 5, note2: 10, note3: 0 },
  csus2: { id: 0, name: 'Csus2', root: 4, quality: '', songId: 0, note1: 6, note2: 11, note3: 0 },
  cbsus2: { id: 0, name: 'C#sus2', root: 5, quality: '', songId: 0, note1: 7, note2: 12, note3: 0 },
  dsus2: { id: 0, name: 'Dsus2', root: 6, quality: '', songId: 0, note1: 8, note2: 1, note3: 0 },
  dbsus2: { id: 0, name: 'D#sus2', root: 7, quality: '', songId: 0, note1: 9, note2: 2, note3: 0 },
  esus2: { id: 0, name: 'Esus2', root: 8, quality: '', songId: 0, note1: 10, note2: 3, note3: 0 },
  fsus2: { id: 0, name: 'Fsus2', root: 9, quality: '', songId: 0, note1: 11, note2: 4, note3: 0 },
  fbsus2: { id: 0, name: 'F#sus2', root: 10, quality: '', songId: 0, note1: 12, note2: 5, note3: 0 },
  gsus2: { id: 0, name: 'Gsus2', root: 11, quality: '', songId: 0, note1: 1, note2: 6, note3: 0 },
  gbsus2: { id: 0, name: 'G#sus2', root: 12, quality: '', songId: 0, note1: 2, note2: 7, note3: 0 },
  asus4: { id: 0, name: 'Asus4', root: 1, quality: '', songId: 0, note1: 6, note2: 8, note3: 0 },
  absus4: { id: 0, name: 'A#sus4', root: 2, quality: '', songId: 0, note1: 7, note2: 9, note3: 0 },
  bsus4: { id: 0, name: 'Bsus4', root: 3, quality: '', songId: 0, note1: 8, note2: 10, note3: 0 },
  csus4: { id: 0, name: 'Csus4', root: 4, quality: '', songId: 0, note1: 9, note2: 11, note3: 0 },
  cbsus4: { id: 0, name: 'C#sus4', root: 5, quality: '', songId: 0, note1: 10, note2: 12, note3: 0 },
  dsus4: { id: 0, name: 'Dsus4', root: 6, quality: '', songId: 0, note1: 11, note2: 1, note3: 0 },
  dbsus4: { id: 0, name: 'D#sus4', root: 7, quality: '', songId: 0, note1: 12, note2: 2, note3: 0 },
  esus4: { id: 0, name: 'Esus4', root: 8, quality: '', songId: 0, note1: 1, note2: 3, note3: 0 },
  fsus4: { id: 0, name: 'Fsus4', root: 9, quality: '', songId: 0, note1: 2, note2: 4, note3: 0 },
  fbsus4: { id: 0, name: 'F#sus4', root: 10, quality: '', songId: 0, note1: 3, note2: 5, note3: 0 },
  gsus4: { id: 0, name: 'Gsus4', root: 11, quality: '', songId: 0, note1: 4, note2: 6, note3: 0 },
  gbsus4: { id: 0, name: 'G#sus4', root: 12, quality: '', songId: 0, note1: 5, note2: 7, note3: 0 },
  adim: { id: 0, name: 'Adim', root: 1, quality: '', songId: 0, note1: 4, note2: 7, note3: 0 },
  abdim: { id: 0, name: 'A#dim', root: 2, quality: '', songId: 0, note1: 5, note2: 8, note3: 0 },
  bdim: { id: 0, name: 'Bdim', root: 3, quality: '', songId: 0, note1: 6, note2: 9, note3: 0 },
  cdim: { id: 0, name: 'Cdim', root: 4, quality: '', songId: 0, note1: 7, note2: 10, note3: 0 },
  cbdim: { id: 0, name: 'C#dim', root: 5, quality: '', songId: 0, note1: 8, note2: 11, note3: 0 },
  ddim: { id: 0, name: 'Ddim', root: 6, quality: '', songId: 0, note1: 9, note2: 12, note3: 0 },
  dbdim: { id: 0, name: 'D#dim', root: 7, quality: '', songId: 0, note1: 10, note2: 1, note3: 0 },
  edim: { id: 0, name: 'Edim', root: 8, quality: '', songId: 0, note1: 11, note2: 2, note3: 0 },
  fdim: { id: 0, name: 'Fdim', root: 9, quality: '', songId: 0, note1: 12, note2: 3, note3: 0 },
  fbdim: { id: 0, name: 'F#dim', root: 10, quality: '', songId: 0, note1: 1, note2: 4, note3: 0 },
  gdim: { id: 0, name: 'Gdim', root: 11, quality: '', songId: 0, note1: 2, note2: 5, note3: 0 },
  gbdim: { id: 0, name: 'G#dim', root: 12, quality: '', songId: 0, note1: 3, note2: 6, note3: 0 },
  aaug: { id: 0, name: 'Aaug', root: 1, quality: '', songId: 0, note1: 5, note2: 9, note3: 0 },
  abaug: { id: 0, name: 'A#aug', root: 2, quality: '', songId: 0, note1: 6, note2: 10, note3: 0 },
  baug: { id: 0, name: 'Baug', root: 3, quality: '', songId: 0, note1: 7, note2: 11, note3: 0 },
  caug: { id: 0, name: 'Caug', root: 4, quality: '', songId: 0, note1: 8, note2: 12, note3: 0 },
  cbaug: { id: 0, name: 'C#aug', root: 5, quality: '', songId: 0, note1: 9, note2: 1, note3: 0 },
  daug: { id: 0, name: 'Daug', root: 6, quality: '', songId: 0, note1: 10, note2: 2, note3: 0 },
  dbaug: { id: 0, name: 'D#aug', root: 7, quality: '', songId: 0, note1: 11, note2: 3, note3: 0 },
  eaug: { id: 0, name: 'Eaug', root: 8, quality: '', songId: 0, note1: 12, note2: 4, note3: 0 },
  faug: { id: 0, name: 'Faug', root: 9, quality: '', songId: 0, note1: 1, note2: 5, note3: 0 },
  fbaug: { id: 0, name: 'F#aug', root: 10, quality: '', songId: 0, note1: 2, note2: 6, note3: 0 },
  gaug: { id: 0, name: 'Gaug', root: 11, quality: '', songId: 0, note1: 3, note2: 7, note3: 0 },
  gbaug: { id: 0, name: 'G#aug', root: 12, quality: '', songId: 0, note1: 4, note2: 8, note3: 0 },
};

const getLocalChord = (chordName) => {
  return chords[chordName];
}

const getNotes = () => {
  return notes;
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
  getNotes,
}
