import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'reactstrap';

import songData from '../data/song-data';

import Navigation from './nav';
import SongCard from './song-card';

import redWall from '../assets/pierre-bamin-UZAStL98aP4-unsplash.jpg'

const MySongs = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    songData.getSongs()
      .then((songs) => setSongs(songs))
      .catch(error => console.error(error));
  }, []);

  const buildLibrary = () => {
    return songs.map(song => (
      <SongCard song={song} />
    ));
  }

  return (
    <div className="my-songs">
      <Navigation authed={props.authed} profile={props.profile} />
      <Jumbotron className="rounded-0 mb-0" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${redWall})`,
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="container text-light mt-5">
          <h1 className="display-4">All Songs!</h1>
          <p className="lead">A list of all of the songs shared by our lovely users!</p>
        </div>
      </Jumbotron>
      <div className="container card rounded-0">
        <div className="row">
          <div className="col-3">
          <div className="lead">Preview</div>
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

export default MySongs;
