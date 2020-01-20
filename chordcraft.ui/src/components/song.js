import React from 'react';

import Navigation from './nav';

const Song = (props) => {
  return (
    <div className="song">
      <Navigation authed={props.authed} />
      <div className="container mt-5">song</div>
    </div>
  )
};

export default Song;
