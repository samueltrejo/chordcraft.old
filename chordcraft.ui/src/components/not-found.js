import React from 'react';

const NotFound = (props) => {
  console.error(props.authed);
  return (
    <div className="not-found">
      404 page not found
    </div>
  )
};

export default NotFound;
