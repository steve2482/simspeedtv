import React from 'react';
import {Link} from 'react-router-dom';

export default function Channel(props) {
  // If Favorite Channels List
  if (props.favorites === undefined) {
    return (
      <div>
        <strong>
          <Link to={'/channels/' + props.name} className='favoriteChannelName'>
            {props.name}
          </Link>
        </strong>
      </div>
    );
  }
  // If Channel List
  else {
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
}