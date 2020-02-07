import React from 'react';
import {
  Jumbotron,
} from 'reactstrap';

import Navigation from './nav';

const GettingStarted = (props) => {
  return (
<div className="getting-started">
      <Navigation authed={props.authed} profile={props.profile} dark={false} light={true} />
      <div className="d-flex flex-column vh-100">
        <div>
          <Jumbotron className="rounded-0 bg-info">
            <div className="container text-light mt-6">
              <h1 className="jumbo-title display-4 text-left">Introduction!</h1>
              <p className="lead">Get started with chordcraft. A songwriting tool for musicians.</p>
            </div>
          </Jumbotron>
          <Jumbotron className="container rounded-0">
            <div className="text-dark mt-5">
              <h1 className="lead text-left">Registration!</h1>
              <p className="">Sign in with google, facebook or email, and to start creating songs.</p>
              {/* <hr className="bg-light my-2" /> */}
              {/* <p>Are you new here, click the getting started button start creating, or saving you current songs.</p> */}
            </div>
          </Jumbotron>
          <Jumbotron className="container rounded-0">
            <div className="text-dark mt-5">
              <h1 className="lead text-left">Song Editor</h1>
              <p className="">Sign in with google, facebook or email, and to start creating songs.</p>
              {/* <hr className="bg-light my-2" /> */}
              {/* <p>Are you new here, click the getting started button start creating, or saving you current songs.</p> */}
            </div>
          </Jumbotron>
        </div>
        <footer className="footer w-100 bg-transparent text-right mt-auto">
          <div className="container">
            <span className="text-muted">Chordcraft by @SamuelTrejo</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default GettingStarted;
