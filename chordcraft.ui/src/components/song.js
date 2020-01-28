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
  isOwner: false,
}

const Song = (props) => {
  const [song, setSong] = useState(defaultSong);
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  }

  const saveSong = () => {
    const updatedSong = { ...song };
    songData.updateSong(updatedSong, updatedSong.id)
      .then(() => {
        getSong();
        toggleEdit();
      })
      .catch(error => console.error(error));
    setEdit(false);
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


  const getSong = () => {
    songData.getSong(props.match.params.id)
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
        <Button color="dark" onClick={toggleEdit}>Edit Song</Button>
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
        <Form className="edit-form" onSubmit={saveSong}>
          <FormGroup>
            <Label for="song-name">Name</Label>
            <Input id="song-name" value={song.name} onChange={updateName} />
          </FormGroup>
          <FormGroup>
            <Label for="song-artist">Artist</Label>
            <Input id="song-artist" value={song.artist} onChange={updateArtist} />
          </FormGroup>
          <FormGroup>
            <Label for="song-genre">Genre</Label>
            <Input id="song-genre" value={song.genre} onChange={updateGenre} />
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

  useEffect(getSong, []);

  return (
    <div className="song vh-100 pt-6 pb-5">
      <Navigation authed={props.authed} profile={props.profile} />
      <div className="single-song container card rounded-0 h-100">
        <div className="row p-3 h-100">
          <div className="col-3">
            {buildSongDetails()}
          </div>
          <div className={edit ? ('col-9 h-100') : ('col-9 h-100 overflow-auto')}>
            {buildSongLyrics()}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Song;
