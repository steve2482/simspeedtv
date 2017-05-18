import React from 'react';
import Video from './video';

import * as actions from '../actions/actions';
import {connect} from 'react-redux';

export class ChannelResults extends React.Component {
  constructor(props) {
    super(props);
    this.loadMoreVideoResults = this.loadMoreVideoResults.bind(this);
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

  render() {
    const channelName = this.props.match.params.channelName;
    // if (this.props.state.channelVideos.length === 0) {
    //   const message = 'Getting channel\'s past broadcasts.'
    //   return (
    //     <div className='channel-results box'>
    //       <h3>{channelName}</h3>
    //       <p>{message}</p>
    //     </div>
    //   );
    // } else {
      const videos = this.props.state.channelVideos.map((eachVideo, index) => {
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
          <button onClick={this.loadMoreVideoResults} id='load-more button'>Load More</button>
        </div>
      );
    // }   
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(ChannelResults);