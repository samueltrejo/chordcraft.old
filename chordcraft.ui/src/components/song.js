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
  lyrics: `[D]I looked in my rear view mirror [Am]and
  It seemed to make a lot more s[Em]ense
  Than what I see ah[G]ead of us, ahead of us, yeah.
  [D]I'm ready to make that t[Am]urn
  Before we both crash and b[Em]urn
  Cause that could be the d[G]eath of us, the death of us, baby
  [Pre-Chorus]
  [D]You know how to drive in rain
  And [Am]you decided not to make a ch[Em]ange
  Stuck in the same old lane
  G[G]oing the wrong way home
  [Chorus]
  I feel like my h[D]eart is stuck in bumper to bumper t[Am]raffic,
  I'm under pressure
  Cause I can't h[Em]ave you the way that I want
  Let's just go b[G]ack to the way it was
  When we were on H[D]oneymoon Avenue
  H[Am]oneymoon Avenue
  B[Em]aby, coastin' like crazy
  Can we get b[G]ack to the way it was?`,
}

const SeedLyrics = `[D]I looked in my rear view mirror [Am]and
It seemed to make a lot more s[Em]ense
Than what I see ah[G]ead of us, ahead of us, yeah.
[D]I'm ready to make that t[Am]urn
Before we both crash and b[Em]urn
Cause that could be the d[G]eath of us, the death of us, baby
[Pre-Chorus]
[D]You know how to drive in rain
And [Am]you decided not to make a ch[Em]ange
Stuck in the same old lane
G[G]oing the wrong way home
[Chorus]
I feel like my h[D]eart is stuck in bumper to bumper t[Am]raffic,
I'm under pressure
Cause I can't h[Em]ave you the way that I want
Let's just go b[G]ack to the way it was
When we were on H[D]oneymoon Avenue
H[Am]oneymoon Avenue
B[Em]aby, coastin' like crazy
Can we get b[G]ack to the way it was?`;

const Song = (props) => {
  const [song, setSong] = useState(defaultSong);
  const [edit, setEdit] = useState(true);

  const saveSong = () => {
    // console.error(song);
    setEdit(false);
  }

  const updateSong = (property, value) => {
    const updatedSong = { ...song };
    updateSong[property] = value;
    setSong(updatedSong);
  }

  const updateName = (event) => updateSong('name', event.target.value);
  const updateArtist = (event) => updateSong('artist', event.target.value);
  const updateGenre = (event) => updateSong('genre', event.target.value);


  const getSong = () => {
    songData.getSong(props.match.params.id)
      .then(song => setSong(song))
      .catch(error => console.error(error));
  }

  const buildSongDetails = () => {
    return edit ? (
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
          <Button type="submit" color="dark">Save</Button>
        </FormGroup>
      </Form>
    ) : (<div></div>);
  }

  const buildSongLyrics = () => {
    if (edit) {
      return <textarea className="song-textarea w-100 h-100" type="textarea" placeholder="type song here" value={SeedLyrics} onChange={() => {}} />
    } else {
      const songLyrics = SeedLyrics.split('\n');
      return songLyrics.map((lyric, index) => (
        <SongPart key={index} lyric={lyric} />
      ))
    }
  }

  useEffect(getSong, []);

  return (
    <div className="song vh-100 pt-6 pb-5">
      <Navigation authed={props.authed} profile={props.profile} />
      <div className="container card rounded-0 h-100">
        <div className="row p-3 h-100">
          <div className="col-3">
            <div className="pb-3">
              {buildSongDetails()}
              {/* <div className="lead">{song.name}</div> */}
            </div>
          </div>
          <div className="col-9 h-100">
            {buildSongLyrics()}
            {/* <div className="lead">{songLyrics}</div> */}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Song;
