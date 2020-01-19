import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from './components/home';
// import HomePublic from './components/home-public';
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


function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => setAuthed(true), []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <PublicRoute path="/auth" component={Home} authed={authed} />
          <PrivateRoute path="/profile" component={Profile} authed={authed} />
          <PrivateRoute path="/song" component={Song} authed={authed} />
          <PrivateRoute path="/song-library" component={SongLibrary} authed={authed} />
          <PrivateRoute path="/my-songs" component={MySongs} authed={authed} />
          <PublicRoute path="/song" component={Song} authed={authed} />
          <PublicRoute path="/song-library" component={SongLibrary} authed={authed} />
          <PrivateRoute path="/" component={Home} authed={authed} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
