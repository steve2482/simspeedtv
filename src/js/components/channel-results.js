import React from 'react';
import Video from './video';

import * as actions from '../actions/actions';
import {connect} from 'react-redux';
import '../../css/Results-window.css';

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
    this.props.dispatch(
      actions.getUpcomingChannelBroadcasts(this.props.match.params.channelName)
    );
    this.props.dispatch(
      actions.getChannelInfo(this.props.match.params.channelName)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.channelName !== this.props.match.params.channelName) {
      this.props.dispatch(
        actions.getChannelBroadcasts(nextProps.match.params.channelName)
        );
      this.props.dispatch(
        actions.getUpcomingChannelBroadcasts(nextProps.match.params.channelName)
        );
      this.props.dispatch(
        actions.getChannelInfo(nextProps.match.params.channelName)
      );
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

  findFavorites(abreviatedNameKey, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].abreviatedName === abreviatedNameKey) {
        return array[i].favorites;
      }
    }
  }

  render() {
    // Channel Info
    const channelName = this.props.state.channelInfo.channelName;
    const banner = this.props.state.channelInfo.banner;
    // Build video lists
    const videos = this.props.state.channelVideos.map((eachVideo, index) => {
      const video = eachVideo;
      return (
        <Video key={index} info={video}/>
      );
    });

    let upcomingVideos;
    if (this.props.state.upcomingChannelBroadcasts.length > 0) {
      upcomingVideos = this.props.state.upcomingChannelBroadcasts.map((eachVideo, index) => {
        const video = eachVideo;
        return (
          <Video key={index} upcomingInfo={video}/>
        );
      });
    } else {
      upcomingVideos = 'We\'re sorry, this channel has not scheduled any upcoming broadcasts.';
    }

    // If User is a Guest Display This
    if (!this.props.state.user) {
      return (
        <div className='channel-results box'>
          <img id='channel-banner' src={banner} alt={channelName}/>
          <h3 className='channel-header'>{channelName}</h3>
          <p>Upcoming Broadcasts</p>
          <div className='video-container line'>
            {upcomingVideos}
          </div>
          <p>Past Broadcasts</p>
          <div className='video-container line'>
            {videos}
          </div>
          <button onClick={this.loadMoreVideoResults} className='load-more-button'>Load More</button>
        </div>
      );  
    }

    // If User Signed in and Current Channel is Favorited Display This
    if (this.props.state.user.favoriteChannels.includes(this.props.match.params.channelName)) {
      return (
        <div className='channel-results box'>
          <img id='channel-banner' src={banner} alt={channelName}/>
          <h3 className='channel-header'>{channelName}</h3>
          <button className='favorite-button' onClick={this.unFavoriteChannel}>Unfavorite</button>
          <p>Upcoming Broadcasts</p>
          <div className='video-container line'>
            {upcomingVideos}
          </div>
          <p>Past Broadcasts</p>
          <div className='video-container line'>
            {videos}
          </div>
          <button onClick={this.loadMoreVideoResults} className='load-more-button'>Load More</button>
        </div>
      );
    }

    // If User Signed in and Current Channel is NOT Favorited Display This 
    if (this.props.state.user) {
      return (
        <div className='channel-results box'>
          <img id='channel-banner' src={banner} alt={channelName}/>
          <h3>{channelName}</h3>
          <button className='favorite-button' onClick={this.favoriteChannel}>Favorite</button>
          <p>Upcoming Broadcasts</p>
          <div className='video-container line'>
            {upcomingVideos}
          </div>
          <p>Past Broadcasts</p>
          <div className='video-container line'>
            {videos}
          </div>
          <button onClick={this.loadMoreVideoResults} className='load-more-button'>Load More</button>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(ChannelResults);