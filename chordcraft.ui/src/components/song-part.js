import React from 'react';

import Chord from './chord';

const SongPart = (props) => {
  const buildSongPart = () => {
    let songLine = props.lyric;
    const bracketPos = songLine.indexOf('[');

    // if song line is an empty
    // then return empty table body
    if(songLine.length === 0) {
      console.error('lyric length is zero');
      return (
        <tbody className="song-part">
          <tr className="chord-row">
            <td> </td>
          </tr>
          <tr className="lyric-row">
            <td></td>
          </tr>
        </tbody>);
    // if song line is not emptry and no chord bracket is found
    // then return table body with just the verse
    } else if (songLine.length !== 0 && bracketPos === -1) {
      console.error('lyric length is not zero but no chord found')
      return (
        <tbody className="song-part">
          <tr className="chord-row">
            <td></td>
          </tr>
          <tr className="lyric-row">
            <td>{songLine}</td>
          </tr>
        </tbody>);
    // if a bracket is found
    // then return table body chords and verse
    } else if (bracketPos !== -1) {
      console.error('found a bracket')
      const chordCells = [];
      let verseCells = [];

      while (songLine.indexOf('[') !== -1) {
        if (songLine.indexOf('[') !== 0) {
          const currentBracketPos = songLine.indexOf('[');
          chordCells.push(<td></td>);
          verseCells.push(<td>{songLine.slice(0, currentBracketPos)}</td>);
          songLine = songLine.slice(bracketPos);
        } else if (songLine.indexOf('[') === 0) {
          const sndBracketPos = songLine.indexOf(']');
          chordCells.push(<Chord chord={songLine.slice(1, sndBracketPos)} />);
          songLine = songLine.slice(sndBracketPos + 1);

          const nextBracketPos = songLine.indexOf('[');
          if (nextBracketPos !== -1) {
            verseCells.push(<td>{songLine.slice(0, nextBracketPos)}</td>);
            songLine = songLine.slice(nextBracketPos);
            console.error(songLine);
          } else if (nextBracketPos === -1) {
            verseCells.push(<td>{songLine}</td>);
          }
        }
      }

        console.error(chordCells);

      return (
        <tbody className="song-part">
          <tr className="chord-row">
            {chordCells}
          </tr>
          <tr className="lyric-row">
            {verseCells}
          </tr>
        </tbody>);
    }
  }

  return (
    <pre>
      {buildSongPart()}
    </pre>
  )
}

export default SongPart;
