import React from 'react';

import Navigation from './nav';

const MySongs = (props) => {
  return (
    <div className="my-songs">
      <Navigation authed={props.authed} />
      <div className="container mt-5">my songs</div>
    </div>
  )
};

export default MySongs;