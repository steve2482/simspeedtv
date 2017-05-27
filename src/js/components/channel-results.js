import React from 'react';
import Video from './video';

import * as actions from '../actions/actions';
import {connect} from 'react-redux';

export class ChannelResults extends React.Component {
  constructor(props) {
    super(props);
    this.loadMoreVideoResults = this.loadMoreVideoResults.bind(this);
    this.favoriteChannel = this.favoriteChannel.bind(this);
    this.unFavoriteChannel = this.unFavoriteChannel.bind(this);
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
    this.props.dispatch(actions.getChannelBroadcasts(this.props.match.params.channelName, this.props.state.nextPageToken));
  }

  favoriteChannel(e) {
    e.preventDefault();
    this.props.dispatch(actions.addFavoriteChannel(this.props.state.user.userName, this.props.match.params.channelName));
  }

  unFavoriteChannel(e) {
    e.preventDefault();
    this.props.dispatch(actions.unFavoriteChannel(this.props.state.user.userName, this.props.match.params.channelName));
  }

  render() {
    // List out Channel Names
    const channelName = this.props.match.params.channelName;
    const videos = this.props.state.channelVideos.map((eachVideo, index) => {
    const video = eachVideo;
      return (
        <Video key={index} info={video}/>
      );
    });

    // If User is a Guest Display This
    if (!this.props.state.user) {
      return (
        <div className='channel-results box'>
          <h3>{channelName}</h3>
          <div className='video-container'>
            {videos}
          </div>
          <button onClick={this.loadMoreVideoResults} id='load-more button'>Load More</button>
        </div>
      );  
    }

    // If User Signed in and Current Channel is Favorited Display This
    if (this.props.state.user.favoriteChannels.includes(this.props.match.params.channelName)) {
      return (
        <div className='channel-results box'>
          <h3>{channelName}</h3><a href='#' id='favorite button' onClick={this.unFavoriteChannel}>Favorited</a>
          <div className='video-container'>
            {videos}
          </div>
          <button onClick={this.loadMoreVideoResults} id='load-more button'>Load More</button>
        </div>
      );
    }

    // If User Signed in and Current Channel is NOT Favorited Display This 
    if (this.props.state.user) {
      return (
        <div className='channel-results box'>
          <h3>{channelName}</h3><a href='#' id='favorite button' onClick={this.favoriteChannel}>Favorite</a>
          <div className='video-container'>
            {videos}
          </div>
          <button onClick={this.loadMoreVideoResults} id='load-more button'>Load More</button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(ChannelResults);