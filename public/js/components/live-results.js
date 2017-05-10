import React from 'react';
import Video from './video';

export default function LiveResults() {
  const videos = [<Video />, <Video />];
  return (
		<div className='live-results box'>
      <h3>Current Live Broadcasts</h3>
			{videos}
		</div>
  );
}