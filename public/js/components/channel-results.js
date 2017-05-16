import React from 'react';
import Video from './video';

import * as actions from '../actions/index';
import {connect} from 'react-redux';

export class ChannelResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(
      actions.getChannelBroadcasts(this.props.match.params.channelName)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.channelName !== this.props.match.params.channelName) {
      this.props.dispatch(
        actions.getChannelBroadcasts(nextProps.match.params.channelName));
    }
  }

  loadMoreVideoResults(e) {
    e.preventDefault();
    this.props.dispatch(actions.getMoreChannelBroadcasts(next.match.params.channelName));
  }

  render() {
    const channelName = this.props.match.params.channelName;
    console.log(channelName);
    console.log(this.props.state.channelVideos);
    if (this.props.state.channelVideos.length === 0) {
      const message = 'Getting channel\'s past broadcasts.'
      return (
        <div className='channel-results box'>
          <h3>{channelName}</h3>
          <p>{message}</p>
        </div>
      );
    } else {
      const videos = this.props.state.channelVideos.items.map((eachVideo, index) => {
      const video = eachVideo;
      return (
        <Video key={index} info={video}/>
      );
      });    

      return (
        <div className='channel-results box'>
          <h3>{channelName}</h3>
          <div className='video-container'>
          {videos}
          </div>
          <button id='load-more button'>Load More</button>
        </div>
      );
    }   
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(ChannelResults);