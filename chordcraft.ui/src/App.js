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
    if (authed) userData.getByUid()
      .then(response => {
        if (response.data) setProfile(response.data);
        else userData.register();
      })
      .catch();
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

  return (
    <div className="app">
      <Router>
        <Switch>
          <PublicRoute path="/auth" component={Home} authed={authed} />
          <PublicRoute path="/login-options" component={LoginOptions} authed={authed} />
          <PrivateRoute path="/profile" component={Profile} authed={authed} />
          <PrivateRoute path="/song" component={Song} authed={authed} />
          <PrivateRoute path="/song-library" component={SongLibrary} authed={authed} />
          <PrivateRoute path="/my-songs" component={MySongs} authed={authed} />
          <PublicRoute path="/song" component={Song} authed={authed} />
          <PublicRoute path="/song-library" component={SongLibrary} authed={authed} />
          <PrivateRoute path="/" component={Home} authed={authed} profile={profile} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
