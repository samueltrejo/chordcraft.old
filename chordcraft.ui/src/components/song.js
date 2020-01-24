import React, { useState, useEffect } from 'react';

import songData from '../data/song-data';

import Navigation from './nav';

const Song = (props) => {
  const [song, setSong] = useState({});

  const getSong = () => {
    songData.getSong(props.match.params.id)
      .then(song => setSong(song))
      .catch(error => console.error(error));
  }

  useEffect(getSong, []);

  return (
    <div className="song">
      <Navigation authed={props.authed} profile={props.profile} />
      <div className="container card rounded-0 mt-6">
        <div className="row">
          <div className="col-3">
            <div className="lead">{song.name}</div>
          </div>
          <div className="col-9">
            <div className="lead">{}</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Song;
