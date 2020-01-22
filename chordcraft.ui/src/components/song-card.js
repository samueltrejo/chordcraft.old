import React from 'react';

import { Card } from 'reactstrap';

const SongCard = (props) => {
  const songDateObject = new Date(Date.parse(props.song.dateAdded));
  const dateAdded = `${(songDateObject.getMonth() + 1)}/${(songDateObject.getUTCDate())}/${songDateObject.getFullYear()}`;
  return (
    <div className="song-card my-3">
      <Card className="row flex-row m-0 p-0 pt-2 rounded-0 border-0">
        <div className="song-title position-relative col p-0 m-0">
          <div className="title-text position-absolute text-white px-1">{props.song.name}</div>
        </div>
        <div className="col p-0 m-0">{props.song.artist}</div>
        <div className="col p-0 m-0">{props.song.genre}</div>
        <div className="col p-0 m-0">{dateAdded}</div>
        <div className="col p-0 m-0">||||||||||||||||||||||</div>
      </Card>
    </div>
  )
};

export default SongCard;
