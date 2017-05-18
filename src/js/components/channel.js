import React from 'react';
import {Link} from 'react-router-dom';

export default function Channel(props) {
  return (
    <div>
      <strong>
        <Link to={'/channels/' + props.name}>
          {props.name}
        </Link>
      </strong>
    </div>
  );
}