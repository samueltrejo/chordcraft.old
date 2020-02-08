import React from 'react';
// import { NavLink as RouteLink } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Jumbotron
} from 'reactstrap';

import instrumentsImg from '../assets/wes-hicks-MEL-jJnm7RQ-unsplash.jpg'
import pianoLogo from '../assets/piano-playground.svg';
import libraryLogo from '../assets/song-library.svg';
import songLogo from '../assets/new-song.svg';
// import pianoImg from '../assets/patrick-schneider-sbAs4JgOesI-unsplash.jpg'

import Navigation from './nav';

// background-color: #fef9e7;
// background-image: linear-gradient(315deg, #fef9e7 0%, #fddac5 74%);

const Home = (props) => {
  return (
    <div className="home">
      <Navigation authed={props.authed} profile={props.profile} dark={true} />
      <div className="d-flex flex-column vh-100">
        <div>
          <Jumbotron className="rounded-0 bg-dark mb-0">
            <div className="container text-light mt-6">
              <div className="jumbo-title text-center lead">Chordcraft</div>
              <hr className="bg-light my-2 w-25" />
              <div className="lead text-center">A songwriting tool for musicians.</div>
            </div>
          </Jumbotron>
          <Jumbotron className="container rounded-0 bg-transparent">
            <div className="text-dark">
              <div className="lead">What would you like to do?</div>
              <div className="row mt-5">
                <div className="col-4 text-center">
                  <Card className="rounded-0 border-0">
                    <CardImg className="p-0 rounded-0" top width="100%" src={pianoLogo} alt="Card image cap" />
                    <CardBody>
                      <div className="lead">Checkout out piano playground</div>
                      <CardText>Play and record a virtual piano.</CardText>
                      <Button className="rounded-0" color="warning">Playground</Button>
                    </CardBody>
                  </Card>
                </div>
                <div className="col-4 text-center">
                  <Card className="rounded-0 border-0">
                    <CardImg className="p-0 rounded-0" top width="100%" src={libraryLogo} alt="Card image cap" />
                    <CardBody>
                      <div className="lead">See what others have created</div>
                      <CardText>A library of songs shared by all users.</CardText>
                      <Button className="rounded-0" color="warning">Library</Button>
                    </CardBody>
                  </Card>
                </div>
                <div className="col-4 text-center">
                  <Card className="rounded-0 border-0">
                    <CardImg className="p-0 rounded-0" top width="100%" src={songLogo} alt="Card image cap" />
                    <CardBody>
                      <div className="lead">Start creating your own song</div>
                      <CardText>Have a look at our song editor.</CardText>
                      <Button className="rounded-0" color="warning">New Song</Button>
                    </CardBody>
                  </Card>
                </div>
              </div>
              {/* <h1 className="jumbo-title display-4 text-center">Musical Playground!</h1> */}
              {/* <p className="lead mx-5">A tool and creative playground to help you do what you do best. This tool is a top-notch editor for creating song chords and lyrics. Click the button below to get started.</p> */}
              {/* <hr className="bg-light my-2" /> */}
              <div></div>
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
