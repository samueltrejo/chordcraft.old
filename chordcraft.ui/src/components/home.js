import React from 'react';
// import { NavLink as RouteLink } from "react-router-dom";
import { Jumbotron } from 'reactstrap';

import instrumentsImg from '../assets/wes-hicks-MEL-jJnm7RQ-unsplash.jpg'
import pianoImg from '../assets/patrick-schneider-sbAs4JgOesI-unsplash.jpg'

import Navigation from './nav';

// background-color: #fef9e7;
// background-image: linear-gradient(315deg, #fef9e7 0%, #fddac5 74%);

const Home = (props) => {
  return (
    <div className="home">
      <Navigation authed={props.authed} profile={props.profile} dark={true} />
      <div className="d-flex flex-column vh-100">
        <div>
          <Jumbotron className="rounded-0" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${instrumentsImg})`,
            backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <div className="container text-light mt-6">
              <h1 className="jumbo-title text-center display-4">Chordcraft</h1>
              <hr className="bg-light my-2 w-25" />
              <p className="lead text-center">A songwriting tool for musicians.</p>
            </div>
          </Jumbotron>
          <Jumbotron className="container rounded-0" style={{backgroundImage: `url(${pianoImg})`,
            backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <div className="text-light mt-5">
              <h1 className="jumbo-title display-4 text-center">Musical Playground!</h1>
              {/* <p className="lead mx-5">A tool and creative playground to help you do what you do best. This tool is a top-notch editor for creating song chords and lyrics. Click the button below to get started.</p> */}
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
};

export default Home;
