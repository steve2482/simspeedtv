import React from 'react';
import '../../css/video.css';
import {Link} from 'react-router-dom';

export default function Video(props) {
  let video = props.info;
  let src = video.snippet.thumbnails.medium.url;
  return (
  <Link id='video-info' to={'/' + video.id.videoId}>
    <img id='video-thumbnail' width='320' height='180' src={src} />
    <h4 id='channel-title'>{video.snippet.channelTitle}</h4>
    <p id='video-title'>{video.snippet.title}</p>
  </Link>
  );
}