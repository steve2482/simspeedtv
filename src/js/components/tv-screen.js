import React from 'react';
import '../../css/tv-screen.css';

export default function TVScreen(props) {
  let videoId = props.match.params.videoId;
  let src = `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`;
  return (
    <div className='tv-screen'>
      <div className='screen-container'>
        <iframe className='screen' width='1280' height='720' src={src} frameBorder='0' allowFullScreen />
      </div>
    </div>
  );
}