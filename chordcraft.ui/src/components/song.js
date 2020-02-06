import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  // ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
// import { makeStyles, useTheme } from '@material-ui/core/styles';

import songData from '../data/song-data';
import chordData from '../data/chord-data';

import Navigation from './nav';
import SongPart from './song-part';

const defaultSong = {
  name: '',
  artist: '',
  genre: '',
  lyrics: '',
  ownerId: 0,
  isOwner: false,
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const Song = (props) => {
  const [song, setSong] = useState(defaultSong);
  const [edit, setEdit] = useState(false);
  const [chords, setChords] = useState([]);
  const [caretPos, setCaretPos] = useState(0);
  const [modal, setModal] = useState(false);
  // const [newModal, setNewModal] = useState(false);
  const [value, setValue] = useState(0);
  const [root, setRoot] = useState('Root');
  const [quality, setQuality] = useState({desc1: 'Quality', desc2: ''});
  const [sharpFlat, setSharpFlat] = useState('');

  const toggleModal = () => setModal(!modal);

  // const toggleNewModal = () => setNewModal(!newModal);

  const toggleEdit = () => setEdit(!edit);

  const handleChange = (event, newValue) => setValue(newValue);

  const handleChangeIndex = index => setValue(index);

  useEffect(() => {
    const songCopy = { ...song }
    songCopy.ownerId = props.profile.id;
    songCopy.isOwner = true;
    if (props.isNew) {
      setEdit(true);
      setSong(songCopy);
    }
  /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const deleteSong = () => {
    songData.deleteSong(song.id)
      .then(() => props.history.push('/song-library'))
      .catch(error => console.error(error));
  }

  const submitSong = (event) => {
    event.preventDefault();
    const songCopy = { ...song };
    if (!props.edit) {
      songData.updateSong(songCopy, songCopy.id)
        .then((response) => {
          getSong(response.id);
          toggleEdit();
        })
        .catch(error => console.error(error));
    } else if (props.edit) {
      songCopy.ownerId = props.profile.id;
      songData.postSong(songCopy)
        .then((response) => {
          getSong(response.id);
          toggleEdit();
        })
        .catch();
    }
  }

  const updateSong = (property, value) => {
    const updatedSong = { ...song };
    updatedSong[property] = value;
    setSong(updatedSong);
  }

  const updateName = (event) => updateSong('name', event.target.value);
  const updateArtist = (event) => updateSong('artist', event.target.value);
  const updateGenre = (event) => updateSong('genre', event.target.value);
  const updateLyrics = (event) => updateSong('lyrics', event.target.value);


  const getSong = (songId) => {
    songData.getSong(props.match.params.id || songId)
      .then(song => {
        setSong(song);
        getChords(song.id);
      })
      .catch(error => console.error(error));
  }

  const buildSongDetails = () => {
    if (song.isOwner && !edit) {
      return (
      <div className="lead">
        <div className="pb-3">{song.name}</div>
        <div className="pb-3">{song.artist}</div>
        <div className="pb-3">{song.genre}</div>
        <div>
          <Button className="mr-1" color="dark" onClick={toggleEdit}>Edit Song</Button>
          <Button type="button" color="dark" onClick={deleteSong}>Delete</Button>
        </div>
      </div>);
    } else if (!song.isOwner) {
      return (
        <div className="lead">
          <div className="pb-3">{song.name}</div>
          <div className="pb-3">{song.artist}</div>
          <div className="pb-3">{song.genre}</div>
        </div>);
    } else if (song.isOwner && edit) {
      return (
        <Form className="edit-form" onSubmit={submitSong}>
          <FormGroup>
            <Label for="song-name">Name</Label>
            <Input id="song-name" value={song.name} onChange={updateName} autoComplete="off" required />
          </FormGroup>
          <FormGroup>
            <Label for="song-artist">Artist</Label>
            <Input id="song-artist" value={song.artist} onChange={updateArtist} autoComplete="off" />
          </FormGroup>
          <FormGroup>
            <Label for="song-genre">Genre</Label>
            <Input id="song-genre" value={song.genre} onChange={updateGenre} autoComplete="off" />
          </FormGroup>
          <FormGroup>
            <Button className="mr-1" type="submit" color="dark">Save</Button>
            <Button type="button" color="dark" onClick={toggleEdit}>Cancel</Button>
          </FormGroup>
        </Form>)
    }
  }

  const buildSongLyrics = () => {
    if (edit) {
      return (
        <textarea
          className="song-textarea w-100 h-100 p-0"
          type="textarea" placeholder="type song here"
          value={song.lyrics} onChange={updateLyrics}
          onClick={getCaretPos} onKeyUp={getCaretPos} />
      )
    } else {
      const songLyrics = song.lyrics.split('\n');
      return songLyrics.map((lyric, index) => (
        <SongPart key={index} lyric={lyric} />
      ))
    }
  }

  const addChord = (event) => {
    if (event.target.localName !== 'button') return;
    
    const songCopy = { ...song };
    const chord = `[${event.target.textContent}]`;

    songCopy.lyrics = `${songCopy.lyrics.slice(0, caretPos)}${chord}${songCopy.lyrics.slice(caretPos)}`;
    setSong(songCopy);
  }

  const addRoot = (event) => {
    if (event.target.localName !== 'button') return;

    setRoot(event.target.textContent);
  }

  const addSharpFlat = (event) => {
    if (event.target.localName !== 'button') return;
    const value = event.target.textContent;
    if (value === sharpFlat) {
      setSharpFlat('');
    } else {
      setSharpFlat(event.target.textContent);
    }
  }

  const addMinor = (event) => {
    if (event.target.localName !== 'button') return;
    const qualityCopy = { ...quality };
    const value = event.target.textContent;
    if (qualityCopy.desc1 === value) {
      qualityCopy.desc1 = '';
      setQuality(qualityCopy);
    } else {
      // console.error(quality.desc2.includes('sus') || quality.desc2.includes('aug') || quality.desc2.includes('dim'));
      if (quality.desc2.includes('sus') || quality.desc2.includes('aug') || quality.desc2.includes('dim') || quality.desc2.includes('5')) {
        qualityCopy.desc2 = '';
      }
      qualityCopy.desc1 = value;
      setQuality(qualityCopy);
    }
  }

  const addNum = (event) => {
    if (event.target.localName !== 'button') return;
    const qualityCopy = { ...quality };
    const value = event.target.textContent;
    if (qualityCopy.desc2 === value) {
      qualityCopy.desc2 = '';
      setQuality(qualityCopy);
    } else {
      if (quality.desc1 === 'Quality') {
        qualityCopy.desc1 = '';
      }
      qualityCopy.desc2 = value;
      setQuality(qualityCopy);
    }
  }

  const addDist = (event) => {
    if (event.target.localName !== 'button') return;
    const qualityCopy = { ...quality };
    const value = event.target.textContent;
    if (qualityCopy.desc2 === value) {
      qualityCopy.desc1 = '';
      qualityCopy.desc2 = '';
      setQuality(qualityCopy);
    } else {
      qualityCopy.desc1 = '';
      qualityCopy.desc2 = value;
      setQuality(qualityCopy);
    }
  }

  const addFifth = (event) => {
    if (event.target.localName !== 'button') return;
    const qualityCopy = { ...quality };
    const value = event.target.textContent;
    if (qualityCopy.desc2 === value) {
      qualityCopy.desc1 = '';
      qualityCopy.desc2 = '';
      setQuality(qualityCopy);
    } else {
      qualityCopy.desc1 = '';
      qualityCopy.desc2 = value;
      setQuality(qualityCopy);
    }
  }

  const getChords = (songId) => {
    chordData.getSongChords(songId)
      .then(chords => setChords(chords))
      .catch(error => console.error(error));
  }

  const saveChord = () => {
    if (root === '') return;

    const chordName = `${root.toLowerCase()}${sharpFlat !== '' ? ('b') : ('')}${quality.desc1}${quality.desc2}`;

    const chord = chordData.getLocalChord(chordName);
    chord.songId = song.id;

    chordData.postChord(chord)
      .then(() => {
        getChords(song.id);
        toggleModal();
      })
      .catch(error => console.error(error));
  }

  const buildChordBank = () => {
    const chordButtons = chords.map(chord => (
      <Button key={chord.id} color="success">{chord.name}</Button>
    ));
    
    if (edit) return (
    <ButtonToolbar>
      <ButtonGroup onClick={addChord}>
        <Button color="warning">G</Button>
        <Button color="warning">B</Button>
        <Button color="warning">C</Button>
        <Button color="warning">Am</Button>
        <Button color="warning">Em</Button>
        <Button color="warning">D</Button>
        <Button color="warning">E</Button>
      </ButtonGroup>
      <ButtonGroup onClick={addChord}>
        {chordButtons}
      </ButtonGroup>
      <ButtonGroup>
        {/* get chords created by user here */}
        <Button className="ml-3" color="info" onClick={toggleModal}>Add Chord</Button>
        <Modal isOpen={modal} toggle={toggleModal}>
          {/* <ModalHeader toggle={toggleModal}>Chord Builder</ModalHeader> */}
          <ModalBody>
            <AppBar position="static" color="default">
              <Tabs  value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                <Tab label="Chord Builder" />
                <Tab label="Custom Chord" />
              </Tabs>
            </AppBar>
            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
              <TabPanel value={value} index={0}>
                <div className="d-flex justify-content-center mb-3">
                  <span className="chord-root text-right text-muted">{root}{sharpFlat}</span>
                  <span className="chord-quality text-muted ml-1">{quality.desc1}{quality.desc2}</span>
                </div>
                <ButtonToolbar className="justify-content-center">
                  <ButtonGroup onClick={addRoot}>
                    <Button color="primary">A</Button>
                    <Button color="primary">B</Button>
                    <Button color="primary">C</Button>
                    <Button color="primary">D</Button>
                    <Button color="primary">E</Button>
                    <Button color="primary">F</Button>
                    <Button color="primary">G</Button>
                  </ButtonGroup>
                </ButtonToolbar>
                <ButtonToolbar className="justify-content-center">
                  <ButtonGroup onClick={addSharpFlat}>
                    {/* <Button color="warning">b</Button> */}
                  </ButtonGroup>
                  <ButtonGroup className="ml-1" onClick={addMinor}>
                    <Button color="success">m</Button>
                  </ButtonGroup>
                  <ButtonGroup onClick={addFifth}>
                    <Button color="success">5</Button>
                  </ButtonGroup>
                  <ButtonGroup className="ml-1" onClick={addNum}>
                    <Button color="success">6</Button>
                    <Button color="success">7</Button>
                  </ButtonGroup>
                  <ButtonGroup className="ml-1" onClick={addSharpFlat}>
                    <Button color="warning">#</Button>
                  </ButtonGroup>
                </ButtonToolbar>
                <ButtonToolbar className="justify-content-center">
                  <ButtonGroup onClick={addDist}>
                    <Button color="danger">sus2</Button>
                    <Button color="danger">sus4</Button>
                    <Button color="danger">dim</Button>
                    <Button color="danger">aug</Button>
                  </ButtonGroup>
                </ButtonToolbar>
                <ModalFooter className="mt-3 pb-0">
                  <Button color="info" onClick={saveChord}>Confirm</Button>{' '}
                  <Button color="info" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
              </TabPanel>
              <TabPanel value={value} index={1}>
                  <div>Oops!, looks like this feature is not available yet. Please try again later.</div>
                  <ModalFooter className="mt-3 pb-0">
                    <Button color="info" onClick={saveChord} disabled>Confirm</Button>{' '}
                    <Button color="info" onClick={toggleModal}>Cancel</Button>
                  </ModalFooter>
              </TabPanel>
            </SwipeableViews>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={toggleModal}>Confirm</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      </ButtonGroup>
    </ButtonToolbar>)
  }

  const getCaretPos = event => {
    const newCaretPos = event.target.selectionStart;
    setCaretPos(newCaretPos);
  }

  useEffect(() => {
    if (!props.edit) getSong();
  }, []);

  return (
    <div className="song">
      <Navigation authed={props.authed} profile={props.profile} />
      <div className="d-flex flex-column vh-100">
        <div className="pt-6 pb-5">
          <div className="single-song container card rounded-0">
            <div className="song-row row p-3">
              <div className="col-3">
                {buildSongDetails()}
              </div>
              <div className="col-9">
                <div className="mb-3">
                  {buildChordBank()}
                </div>
                <div className="h-75">
                  {buildSongLyrics()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer w-100 bg-light text-center mt-auto">
          <div className="container">
            <span className="text-muted">Chordcraft by @SamuelTrejo</span>
          </div>
        </footer>
      </div>
    </div>
  )
};

export default Song;
