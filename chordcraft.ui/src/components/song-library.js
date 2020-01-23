import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'reactstrap';

import songData from '../data/song-data';

import SongCard from './song-card';

import bandImg from '../assets/hans-vivek-By96LAr-34o-unsplash.jpg';

import Navigation from './nav';

const SongLibrary = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    songData.getSongs()
      .then((songs) => setSongs(songs))
      .catch(error => console.error(error));
  }, []);

  const buildLibrary = () => {
    return songs.map(song => (
      <SongCard key={song.id} song={song} />
    ));
  }

  return (
    <div className="song-library vh-100">
      <Navigation authed={props.authed} profile={props.profile} />
      <Jumbotron className="rounded-0 mb-0" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bandImg})`,
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="container text-light mt-5">
          <h1 className="display-4">All Songs!</h1>
          <p className="lead">A list of all of the songs shared by our lovely users!</p>
        </div>
      </Jumbotron>
      <div className="container card rounded-0">
        <div className="row">
          <div className="col-3">
            <div className="lead">Filters</div>
          </div>
          <div className="col-9">
            <div className="lead">Sort By</div>
            <div>{buildLibrary()}</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SongLibrary;
