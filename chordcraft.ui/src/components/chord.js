import React, { useState, useEffect } from 'react';

import chordData from '../data/chord-data';

import '../styles/chord.scss';

const noteData = chordData.getNotes();

const Chord = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [chord, setChord] = useState({});
  const [notes] = useState(noteData);

  const playChord = () => {
    // console.error(notes[`note${chord.root}`].currentTime)
    if (notes[`note${chord.root}`]) {
      notes[`note${chord.root}`].currentTime = 0;
      notes[`note${chord.root}`].play();
    }
    
    if (notes[`note${chord.note2}`]) {
      notes[`note${chord.note1}`].currentTime = 0;
      notes[`note${chord.note1}`].play();
    }

    if (notes[`note${chord.note2}`]) {
      notes[`note${chord.note2}`].currentTime = 0;
      notes[`note${chord.note2}`].play();
    }

    if (notes[`note${chord.note3}`]) {
      notes[`note${chord.note3}`].currentTime = 0;
      notes[`note${chord.note3}`].play();
    }
  }

  useEffect(() => {
    const chordLower = props.chord.toLowerCase();
    const chordConvertHash = chordLower.replace('#', 'b');
    
    chordData.getChordByName(chordConvertHash)
      .then(chordData => {
        if (chordData) setChord(chordData);
      })
      .catch(error => console.error(error));
  /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  const noteCheck = (note) => {
    let check = false;
    if (note === chord.root) check = true;
    if (note === chord.note1) check = true;
    if (note === chord.note2) check = true;
    if (note === chord.note3) check = true;

    return check;
  }

  const showChord = () => setIsShown(true);

  const hideChord = () => setIsShown(false);

  const buildChordOverlay = () => {
    const chordClass = isShown ? ('card position-absolute chord-overlay') : ('card position-absolute chord-overlay d-none')
    return (
      <div id="chord-overlay" className={chordClass}>
        <div className="piano-container d-flex flex-column">
          <div className="card-body">

            <h5 className="card-title">{chord.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Piano</h6>

            <div className="position-relative piano e">
              <div className="white-keys d-flex">
                {noteCheck(4) ? (<div className="key c bg-info"></div>) : (<div className="key c"></div>)}
                {noteCheck(6) ? (<div className="key d bg-info"></div>) : (<div className="key d"></div>)}
                {noteCheck(8) ? (<div className="key e bg-info"></div>) : (<div className="key e"></div>)}
                {noteCheck(9) ? (<div className="key f bg-info"></div>) : (<div className="key f"></div>)}
                {noteCheck(11) ? (<div className="key g bg-info"></div>) : (<div className="key g"></div>)}
                {noteCheck(1) ? (<div className="key a bg-info"></div>) : (<div className="key a"></div>)}
                {noteCheck(3) ? (<div className="key b bg-info"></div>) : (<div className="key b"></div>)}
              </div>
              <div className="black-keys position-absolute">
                {noteCheck(5) ? (<div className="key csharp bg-warning"></div>) : (<div className="key csharp bg-black"></div>)}
                {noteCheck(7) ? (<div className="key dsharp bg-warning"></div>) : (<div className="key dsharp bg-black"></div>)}
                {noteCheck(10) ? (<div className="key fsharp bg-warning"></div>) : (<div className="key fsharp bg-black"></div>)}
                {noteCheck(12) ? (<div className="key gsharp bg-warning"></div>) : (<div className="key gsharp bg-black"></div>)}
                {noteCheck(2) ? (<div className="key asharp bg-warning"></div>) : (<div className="key asharp bg-black"></div>)}
                <div className="key csharp"></div>
                <div className="key dsharp"></div>
                <div className="key fsharp"></div>
                <div className="key gsharp"></div>
                <div className="key asharp"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <td className="chord position-relative" onClick={playChord}>
      <span onMouseOver={showChord} onMouseLeave={hideChord}>{props.chord}</span>
      {buildChordOverlay()}
    </td>
  )
};

export default Chord;