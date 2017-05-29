import React from 'react';
import {Link} from 'react-router-dom';

export default function Channel(props) {
  return (
    <div>
      <strong>
        <Link to={'/channels/' + props.name} className='channelName'>
          {props.name}
        </Link>
      </strong>
      <p className='favorite-count'>({props.favorites})</p>
    </div>
  );
}