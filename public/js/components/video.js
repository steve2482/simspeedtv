import React from 'react';

export default function Video(props) {
  let video = props.info;
  let src = `https://www.youtube.com/embed/${video.id.videoId}`;
  return (
  <div id='video-info'>
    <iframe id='video-thumbnail' width='320' height='180' src={src} frameBorder='0' allowFullScreen />
    <h4 id='channel-title'>{video.snippet.channelTitle}</h4>
    <p id='video-title'>{video.snippet.title}</p>
  </div>
  );


  // ONLY DISPLAYS FIRST VIDEO OF CHANNEL ITEMS
  // let video = props.info.items[0];
  // let src = `https://www.youtube.com/embed/${video.id.videoId}`;
  // return (
  //   <div id='video-info'>
  //     <iframe id='video-thumbnail' width='320' height='180' src={src} frameBorder='0' allowFullScreen />
  //     <h4 id='channel-title'>{video.snippet.channelTitle}</h4>
  //     <p id='video-title'>{video.snippet.title}</p>
  //   </div>
  // );
}