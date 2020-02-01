import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseInit from './requests/firebase-init';

import userData from './data/user-data';

import Home from './components/home';
import LoginOptions from './components/login-options';
import Profile from './components/profile';
import Song from './components/song';
import SongLibrary from './components/song-library';
import MySongs from './components/my-songs';
import NotFound from './components/not-found';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component authed={authed} {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

firebaseInit();


function App() {
  const [authed, setAuthed] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (authed) userData.getByUid(firebase.auth().currentUser.uid)
      .then(user => {
        if (user) setProfile(user);
        else userData.register().then(user => setProfile(user));
      })
      .catch(error => console.error(error));
  }, [authed]);

  useEffect(() => {
    const removeListener = firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) setAuthed(true);
        else setAuthed(false); setProfile(null);
      });
    return () => {
      removeListener();
    };
  }, []);

  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    document.querySelector('.navigation').style.background = `linear-gradient(rgba(0, 0, 0, ${currentScrollPos / 250}), rgba(0, 0, 0, ${currentScrollPos / 250}))`;
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <PublicRoute path="/auth" component={Home} authed={authed} profile={profile} />
          <PublicRoute path="/login-options" component={LoginOptions} authed={authed} profile={profile} />
          <PrivateRoute path="/profile" component={Profile} authed={authed} profile={profile} />
          <PrivateRoute path="/song/:id" component={Song} authed={authed} profile={profile} />
          <PrivateRoute path="/song" component={Song} authed={authed} profile={profile} edit={true} />
          <PrivateRoute path="/song-library" component={SongLibrary} authed={authed} profile={profile} />
          <PrivateRoute path="/my-songs" component={MySongs} authed={authed} profile={profile} />
          <PublicRoute path="/song-library" component={SongLibrary} authed={authed} profile={profile} />
          <PrivateRoute path="/" component={Home} authed={authed} profile={profile} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
