import React, { useState, useEffect } from 'react';
import { Jumbotron } from 'reactstrap';

import songData from '../data/song-data';

import Navigation from './nav';
import SongCard from './song-card';

import redWall from '../assets/pierre-bamin-UZAStL98aP4-unsplash.jpg'

const MySongs = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (props.authed) {
      songData.getMySongs()
        .then((songs) => setSongs(songs))
        .catch(error => console.error(error));
    }
  }, [props.authed]);

  const buildLibrary = () => {
    return songs.map(song => (
      <SongCard key={song.id} song={song} />
    ));
  }

  return (
    <div className="my-songs">
      <Navigation authed={props.authed} profile={props.profile} dark={true} />
      <Jumbotron className="rounded-0 mb-0" style={{backgroundImage: `url(${redWall})`,
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="container text-light mt-6">
          <h1 className="jumbo-title display-4">My Songs!</h1>
          <p className="lead">A list of all of my songs!</p>
        </div>
      </Jumbotron>
      <div className="container card rounded-0">
        <div className="row">
          <div className="col-12 col-md-3">
          <div className="lead">Preview</div>
          <div className="lead">Filters</div>
          </div>
          <div className="col-12 col-md-9">
            <div className="lead">Sort By</div>
            <div>{buildLibrary()}</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MySongs;
