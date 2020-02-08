import React from 'react';


import { Card } from 'reactstrap';

const SongCard = (props) => {
  const songDateObject = new Date(Date.parse(props.song.dateAdded));
  const dateAdded = `${(songDateObject.getMonth() + 1)}/${(songDateObject.getUTCDate())}/${songDateObject.getFullYear()}`;

  const toDetails = () => {
    props.toSongDetails(props.song.id);
  }

  return (
    <div className="song-card my-3" onClick={toDetails}>
      <Card className="row flex-row m-0 p-0 py-2 rounded-0 border-0">
        <div className="song-title position-relative col-12 col-md-4 p-0 m-0">
          <div className="title-text position-absolute text-white px-1">{props.song.name}</div>
        </div>
        <div className="col-12 col-md-3 m-0 mt-4 mt-md-0">{props.song.artist}</div>
        <div className="col-12 col-md-3 m-0">{props.song.genre}</div>
        <div className="col-12 col-md-2 m-0">{dateAdded}</div>
        {/* <div className="col-4 col-md-4 m-0">Views</div> */}
      </Card>
    </div>
  )
};

export default SongCard;
