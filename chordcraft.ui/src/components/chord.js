import React from 'react';

const Chord = (props) => {
  const buildChordOverlay = () => {
    // display chord overlay functionality here
  }
  return (
    <td className="chord position-relative">
      <span>{props.chord}</span>
      {buildChordOverlay()}
    </td>
  )
};

export default Chord;