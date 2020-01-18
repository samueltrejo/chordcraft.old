import React, { useState, useEffect } from 'react';
import { useRoutes, A } from 'hookrouter';

import Home from './components/home';
// import HomePublic from './components/home-public';
import Profile from './components/profile';
import Song from './components/song';
import SongLibrary from './components/song-library';
import NotFound from './components/not-found';

import './styles/app.scss';

// const getRoutes = (authed) => ({
//   "/": () => <Home authed={authed} />,
//   "/profile": () => <Profile authed={authed} />,
//   "/song": () => <Song authed={authed} />,
//   "/song-library": () => <SongLibrary authed={authed} />
// });

const routes = {
  "/": () => (authed) => <Home authed={authed} />,
  "/profile": () => (authed) => <Profile authed={authed} />,
  "/song": () => (authed) => <Song authed={authed} />,
  "/song-library": () => (authed) => <SongLibrary authed={authed} />
}


function App() {
  const [authed, setAuthed] = useState(false);

  const routeResult = useRoutes(routes);

  useEffect(() => setAuthed(true), []);

  return (
    <div className="app">
      <A href="/">home</A><br />
      <A href="/profile">profile</A><br />
      <A href="/song">song</A><br />
      <A href="/song-library">song library</A>
      {routeResult(authed) || <NotFound />}
    </div>
  );
}

export default App;
