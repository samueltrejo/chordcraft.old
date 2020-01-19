import React from 'react';

import Navigation from './nav';

const NotFound = (props) => {
  return (
    <div className="not-found">
      <Navigation />
      <div className="container mt-5">404 page not found</div>
    </div>
  )
};

export default NotFound;
