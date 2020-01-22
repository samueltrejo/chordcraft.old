import React from 'react';
import { Button, Jumbotron } from 'reactstrap';

import instrumentsImg from '../assets/wes-hicks-MEL-jJnm7RQ-unsplash.jpg'
import pianoImg from '../assets/patrick-schneider-sbAs4JgOesI-unsplash.jpg'

import Navigation from './nav';

const Home = (props) => {
  return (
    <div className="home vh-100">
      <Navigation authed={props.authed} profile={props.profile} />
      <Jumbotron className="h-75 rounded-0" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${instrumentsImg})`,
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="container text-light mt-5">
          <h1 className="display-4 text-center">Welcome to Chordcraft!</h1>
          <p className="lead mx-5">A tool and creative playground to help you do what you do best. This tool is a top-notch editor for creating song chords and lyrics. Click the button below to get started.</p>
          <hr className="bg-light my-2 w-75" />
          {/* <p>Are you new here, click the getting started button start creating, or saving you current songs.</p> */}
          <p className="lead text-center">
            <Button className="bg-transparent text-light" color="light">Getting Started</Button>
          </p>
        </div>
      </Jumbotron>
      <Jumbotron className="rounded-0" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${pianoImg})`,
        backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="container text-light mt-5">
          <h1 className="display-4 text-center">Musical Playground!</h1>
          <p className="lead mx-5">A tool and creative playground to help you do what you do best. This tool is a top-notch editor for creating song chords and lyrics. Click the button below to get started.</p>
          {/* <hr className="bg-light my-2" /> */}
          {/* <p>Are you new here, click the getting started button start creating, or saving you current songs.</p> */}
        </div>
      </Jumbotron>
    </div>
  )
};

export default Home;
