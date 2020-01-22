import React from 'react';

import { Card } from 'reactstrap';

const SongCard = (props) => {
  return (
    <div className="song-card my-3">
      <Card className="row flex-row m-0 p-0 rounded-0 border-0">
        <div className="col-6 p-0 m-0">{props.song.name}</div>
        <div className="col-6 p-0 m-0">{props.song.artist}</div>
      </Card>
    </div>
  )
};

export default SongCard;
