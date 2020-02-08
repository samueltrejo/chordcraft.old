import React, { useState } from 'react';

import {
  Button,
  Jumbotron,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

import Navigation from './nav';

import songData from '../data/song-data';

import loginImg from '../assets/austin-distel-VCFxt2yT1eQ-unsplash.jpg';

const newSong = {
  name: '',
  artist: '',
  genre: '',
  lyrics: '',
  isPublic: false,
}

const NewSong = (props) => {
  const [song, setSong] = useState(newSong);

  const postSong = (event) => {
    event.preventDefault();
    const songCopy = { ...song };
    songCopy.ownerId = props.profile.id;
    songData.postSong(songCopy)
      .then((song) => props.history.push(`/song/${song.id}`))
      .catch(error => console.error(error));
  }

  const updateSong = (event, value) => {
    const songCopy = { ...song };
    songCopy[value] = event.target.value;
    setSong(songCopy);
  }

  const updateName = (event) => updateSong(event, 'name');
  const updateArtist = (event) => updateSong(event, 'artist');
  const updateGenre = (event) => updateSong(event, 'genre');
  const updateLyrics = (event) => updateSong(event, 'lyrics');
  const updateIsPublic = (event) => {
    const songCopy = { ...song };
    songCopy.isPublic = event.target.checked;
    setSong(songCopy);
  }

  return (
    <div className="login-options">
      <Navigation authed={props.authed} profile={props.profile} dark={false} light={true} />
      <div className="container mt-6">
        <Jumbotron className="row w-100 p-0 mx-0 bg-light">
            <div className="col-6 p-5">
              <h1 className="text-center jumbo-title">New Song!</h1>
              <div className="lead text-center">Please fill out your new song's details below.</div>
              <Form className="mt-3" onSubmit={postSong}>
                <FormGroup className="mb-0">
                  <Label for="song-name">Song Name</Label>
                  <Input type="text" name="name" id="song-name" placeholder="Name" required value={song.name} onChange={updateName} />
                  <div className="small text-right">Required</div>
                </FormGroup>
                <FormGroup className="mb-3" check>
                  <Label check>
                    <Input type="checkbox" checked={song.isPublic} onChange={updateIsPublic} />{' '}
                    Make this song public?
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label for="song-artist">Artist</Label>
                  <Input type="text" name="artist" id="song-artist" placeholder="Artist" value={song.artist} onChange={updateArtist} />
                </FormGroup>
                <FormGroup>
                  <Label for="song-genre">Genre</Label>
                  <Input type="text" name="genre" id="song-genre" placeholder="Genre" value={song.genre} onChange={updateGenre} />
                </FormGroup>
                <FormGroup>
                  <Label for="song-lyrics">Lyrics</Label>
                  <Input type="textarea" name="lyrics" id="song-lyrics" placeholder="lyrics" value={song.lyrics} onChange={updateLyrics} />
                </FormGroup>
                <div className="text-center"><Button type="submit" color="dark">Create</Button></div>
              </Form>
            </div>
          <div className="col-6 rounded-right" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginImg})`,
          backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
        </Jumbotron>
      </div>
    </div>
  )
}

export default NewSong;
