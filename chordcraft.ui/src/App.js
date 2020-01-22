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
    console.error('test');
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

  return (
    <div className="app">
      <Router>
        <Switch>
          <PublicRoute path="/auth" component={Home} authed={authed} profile={profile} />
          <PublicRoute path="/login-options" component={LoginOptions} authed={authed} profile={profile} />
          <PrivateRoute path="/profile" component={Profile} authed={authed} profile={profile} />
          <PrivateRoute path="/song" component={Song} authed={authed} profile={profile} />
          <PrivateRoute path="/song-library" component={SongLibrary} authed={authed} profile={profile} />
          <PrivateRoute path="/my-songs" component={MySongs} authed={authed} profile={profile} />
          <PublicRoute path="/song" component={Song} authed={authed} profile={profile} />
          <PublicRoute path="/song-library" component={SongLibrary} authed={authed} profile={profile} />
          <PrivateRoute path="/" component={Home} authed={authed} profile={profile} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
