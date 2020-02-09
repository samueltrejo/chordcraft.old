import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'reactstrap';

import songData from '../data/song-data';

import SongCard from './song-card';

import bandImg from '../assets/andrew-buchanan-LVPv1uZadpU-unsplash.jpg';

import Navigation from './nav';

const SongLibrary = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (props.authed !== null) {
      songData.getSongs()
        .then((songs) => setSongs(songs))
        .catch(error => console.error(error));
    }
  }, [props.authed]);

  const toSongDetails = (songId) => {
    props.history.push(`/song/${songId}`);
  }

  const buildLibrary = () => {
    return songs.map(song => (
      <SongCard key={song.id} song={song} toSongDetails={toSongDetails} />
    ));
  }

  return (
    <div className="song-library">
      <Navigation authed={props.authed} profile={props.profile} dark={true} />
      <div className="d-flex flex-column vh-100">
        <div>
          <Jumbotron className="rounded-0 mb-0" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bandImg})`,
            backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <div className="container text-light mt-6">
              <h1 className="jumbo-title display-4">All Songs!</h1>
              <p className="lead">A list of all of the songs shared by our users!</p>
            </div>
          </Jumbotron>
          <div className="container card rounded-0 border-0">
            <div className="row">
              <div className="col-12 col-md-3">
                <div className="lead">Filters</div>
              </div>
              <div className="col-12 col-md-9">
                <div className="lead">Sort By</div>
                <div>{buildLibrary()}</div>
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

export default SongLibrary;
