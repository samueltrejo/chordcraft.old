import React from 'react';

import Navigation from './nav';

const Profile = (props) => {
  return (
    <div className="profile">
      <Navigation authed={props.authed} />
      <div className="container mt-5">profile</div>
    </div>
  )
};

export default Profile;
