import React from 'react';

import Navigation from './nav';

const NotFound = (props) => {
  return (
    <div className="not-found">
      <Navigation authed={props.authed} profile={props.profile} />
      <div className="container mt-5">404 page not found</div>
    </div>
  )
};

export default NotFound;
