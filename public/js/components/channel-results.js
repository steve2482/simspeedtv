import React from 'react';
import Video from './video';

export default function ChannelResults() {
  const videos = [<Video />, <Video />, <Video />, <Video />];
  return (
		<div className='channel-results box'>
			<h3>Channel Results</h3>
      {videos}
		</div>
	);
}