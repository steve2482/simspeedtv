import React from 'react';
import {Link} from 'react-router-dom';
import Channel from './channel';
import CHANNELS from '../channels';

export default function Sidebar() {
  const channels = Object.keys(CHANNELS).map((channelId, index) => {
    const channel = CHANNELS[channelId];
    return (
      <li key={index}>
        <Channel name={channel.name} id={channel.youtubeId} />
      </li>
    );
  });
  return (
    <div className='sidebar box'>
      <h4 id='channel-list-header'>Channel List</h4>
      <ul>
        {channels}
      </ul>      
    </div>
  );
}