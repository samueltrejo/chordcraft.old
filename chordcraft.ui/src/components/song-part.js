import React from 'react';

import Chord from './chord';

const SongPart = (props) => {
  const buildSongPart = () => {
    let songLine = props.lyric;
    const bracketPos = songLine.indexOf('[');

    // if song line is an empty
    // then return empty table body
    if(songLine.length === 0) {
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
      return (
        <tbody className="song-part">
          <tr className="chord-row">
            <td> </td>
          </tr>
          <tr className="lyric-row">
            <td>{songLine}</td>
          </tr>
        </tbody>);
    // if a bracket is found
    // then return table body chords and verse
    } else if (bracketPos !== -1) {
      const chordCells = [];
      let verseCells = [];

      while (songLine.indexOf('[') !== -1) {
        const key = chordCells.length;
        if (songLine.indexOf('[') !== 0) {
          const currentBracketPos = songLine.indexOf('[');
          chordCells.push(<td key={key}></td>);
          verseCells.push(<td key={key}>{songLine.slice(0, currentBracketPos)}</td>);
          songLine = songLine.slice(bracketPos);
        } else if (songLine.indexOf('[') === 0) {
          const sndBracketPos = songLine.indexOf(']');
          chordCells.push(<Chord key={key} chord={songLine.slice(1, sndBracketPos)} />);
          songLine = songLine.slice(sndBracketPos + 1);

          const nextBracketPos = songLine.indexOf('[');
          if (nextBracketPos !== -1) {
            verseCells.push(<td key={key}>{songLine.slice(0, nextBracketPos)}</td>);
            songLine = songLine.slice(nextBracketPos);
          } else if (nextBracketPos === -1) {
            verseCells.push(<td key={key}>{songLine}</td>);
          }
        }
      }

      return (
        <tbody>
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
    <pre className="song-part">
      <table className="song-table">
        {buildSongPart()}
      </table>
    </pre>
  )
}

export default SongPart;
