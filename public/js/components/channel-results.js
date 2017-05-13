import React from 'react';
import Video from './video';

export default function ChannelResults(props) {
  const channelName = props.match.params.channelName;
  return (
		<div className='channel-results box'>
			<h3>{channelName}</h3>
		</div>
	);
}