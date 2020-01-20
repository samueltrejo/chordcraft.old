import React from 'react';

import Navigation from './nav';

const SongLibrary = (props) => {
  return (
    <div className="song-library">
      <Navigation authed={props.authed} />
      <div className="container mt-5">song library</div>
    </div>
  )
};

export default SongLibrary;
