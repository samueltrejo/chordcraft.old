import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import songData from '../data/song-data';

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

const Song = (props) => {
  const [song, setSong] = useState(defaultSong);
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  }

  useEffect(() => {
    const songCopy = { ...song }
    songCopy.ownerId = props.profile.id;
    songCopy.isOwner = true;
    if (props.edit) {
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
      .then(song => setSong(song))
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
      return <textarea className="song-textarea w-100 h-100 p-0" type="textarea" placeholder="type song here" value={song.lyrics} onChange={updateLyrics} />
    } else {
      const songLyrics = song.lyrics.split('\n');
      return songLyrics.map((lyric, index) => (
        <SongPart key={index} lyric={lyric} />
      ))
    }
  }

  useEffect(() => {
    if (!props.edit) getSong();
  }, []);

  return (
    <div className="song pt-6 pb-5">
      <Navigation authed={props.authed} profile={props.profile} />
      <div className="single-song container card rounded-0 h-100">
        <div className="row p-3 h-100">
          <div className="col-3">
            {buildSongDetails()}
          </div>
          <div className={edit ? ('col-9 h-100') : ('col-9 h-100')}>
            {buildSongLyrics()}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Song;
