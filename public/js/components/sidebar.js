import React from 'react';
import {Link} from 'react-router-dom';
import Channel from './channel';
import CHANNELS from '../channels';

export default function Sidebar() {
  const channels = Object.keys(CHANNELS).map((channelId, index) => {
    const channel = CHANNELS[channelId];
    return (
      <li key={index}>
        <Channel name={channel.name} />
      </li>
    );
  });
  return (
    <div className='sidebar box'>
      <h4>Channel List</h4>
      <ul>
        {channels}
      </ul>      
    </div>
  );
}