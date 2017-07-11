import React from 'react';
import '../../css/video.css';
import {Link} from 'react-router-dom';

export default function Video(props) {
  if (props.upcomingInfo) {
    let video = props.upcomingInfo;
    let src = video.thumbnail;
    return (
      <Link id='video-info' to={'/video/' + video.videoId}>
        <img id='video-thumbnail' width='320' height='180' src={src} alt={video.title} />
        <h4 id='channel-title'>{video.channelTitle}</h4>
        <p id='video-title'>{video.title}</p>
        <p id='date'>{video.date}</p>
      </Link>
    );
  } else {
    let video = props.info;
    let src = video.snippet.thumbnails.medium.url;
    return (
    <Link id='video-info' to={'/video/' + video.id.videoId}>
      <img id='video-thumbnail' width='320' height='180' src={src} alt={video.title} />
      <h4 id='channel-title'>{video.snippet.channelTitle}</h4>
      <p id='video-title'>{video.snippet.title}</p>
    </Link>
    );
  }  
}