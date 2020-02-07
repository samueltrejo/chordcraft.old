import React from 'react';

import Navigation from './nav';

const Profile = (props) => {
  return (
    <div className="profile">
      <Navigation authed={props.authed} profile={props.profile} dark={false} light={true} />
      <div className="container mt-5"></div>
    </div>
  )
};

export default Profile;
