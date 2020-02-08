import React, { useState } from 'react';

import Navigation from './nav';

import chordData from '../data/chord-data';
import '../styles/piano.scss';
import { Jumbotron } from 'reactstrap';

const notes = chordData.getNotes();


const whiteKeys = [
  { id: 4, name: 'c', class: 'piano-key', color: 'bg-info' },
  { id: 6, name: 'd', class: 'piano-key', color: 'bg-info' },
  { id: 8, name: 'e', class: 'piano-key', color: 'bg-info' },
  { id: 9, name: 'f', class: 'piano-key', color: 'bg-info' },
  { id: 11, name: 'g', class: 'piano-key', color: 'bg-info' },
  { id: 1, name: 'a', class: 'piano-key', color: 'bg-info' },
  { id: 3, name: 'b', class: 'piano-key', color: 'bg-info' }
];

const blackKeys = [
  { id: 5, name: 'csharp', class: 'piano-key first', color: 'bg-warning' },
  { id: 7, name: 'dsharp', class: 'piano-key second', color: 'bg-warning' },
  { id: 10, name: 'fsharp', class: 'piano-key third', color: 'bg-warning' },
  { id: 12, name: 'gsharp', class: 'piano-key fourth', color: 'bg-warning' },
  { id: 2, name: 'asharp', class: 'piano-key fifth', color: 'bg-warning' }
];

const Key = (props) => {
  const [keyClass, setKeyClass] = useState(props.note.class);

  const playSound = () => {
    notes[`note${props.note.id}`].currentTime = 0;
    notes[`note${props.note.id}`].play();
  }

  const hightlightKey = () => {
    setKeyClass(`${props.note.class} ${props.note.color}`)
  }

  const unhighlightKey = () => {
    setKeyClass(props.note.class);
  }

  return (
    <div className={keyClass} onClick={playSound} onMouseOver={hightlightKey} onMouseLeave={unhighlightKey}></div>
  )
}

const PianoPlayground = (props) => {
  const buildKeys = (keys) => {
    return keys.map(key => <Key key={key.id} note={key} />)
  }

  return (
    <div className="piano-playground">
      <Navigation authed={props.authed} profile={props.profile} dark={false} light={true} />
      <div className="d-flex flex-column vh-100">
        <Jumbotron>
          <div className="jumbo-title mt-6">Virtual Piano</div>
          <div className="piano-container d-flex justify-content-center">

            <div className="position-relative playground-piano">
              <div className="playground-white-keys d-flex">
                {buildKeys(whiteKeys)}
              </div>

              <div className="playground-black-keys position-absolute">
                {buildKeys(blackKeys)}
              </div>
            </div>
              
          </div>

        </Jumbotron>

        <footer className="footer w-100 bg-transparent text-right mt-auto">
          <div className="container">
            <span className="text-muted">Chordcraft by @SamuelTrejo</span>
          </div>
        </footer>

      </div>
    </div>
  )
};

export default PianoPlayground;
