import React from 'react';
import Video from './video';

import * as actions from '../actions/actions';
import {connect} from 'react-redux';

export class LiveResults extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.dispatch(
      actions.getLiveBroadcasts()
    );
  }

  render() {
    let message = 'Choose a live broadcast or choose your favorite channel from the channel guide.';
    let numberOfBroadcasts = 0;
    let broadcasts = null;
    // Check if any live broadcasts, if none, display message to instruct user to select a channel
    for (let i = 0; i < this.props.state.liveBroadcasts.length; i++) {      
      if (this.props.state.liveBroadcasts[i].items.length > 0) {
        numberOfBroadcasts++;
      }
    }
    if (numberOfBroadcasts === 0) {
      message = 'There are currently no races being broadcast live. Choose a channel from the channel guide to see previously broadcast races.';
    } else {
      // If there are current live broadcasts, filter them out
      const currentLiveBroadcasters = this.props.state.liveBroadcasts.filter((broadcast) => {
        return broadcast.items.length > 0;
      });
      let currentLiveBroadcasts = [];
      for (let i = 0; i < currentLiveBroadcasters.length; i++) {
        for (let x = 0; x < currentLiveBroadcasters[i].items.length; x++) {
          currentLiveBroadcasts.push(currentLiveBroadcasters[i].items[x]);
        }
      }
      let broadcasts = currentLiveBroadcasts.map((broadcast, index) => {
        const broadcastInfo = broadcast;
        return (
          <Video key={index} info={broadcastInfo} />
        );        
      });
      return (
      <div className='live-results box'>
        <h3>Current Live Broadcasts</h3>
        <p className='message'>{message}</p>
        <div className='video-container'>
        {broadcasts}
        </div>
      </div>
      );     
    }
    return (
      <div className='live-results box'>
        <h3>Current Live Broadcasts</h3>
        <p className='message'>{message}</p>
        <div className='video-container'>
        {broadcasts}
        </div>
      </div>
    );    
  }  
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(LiveResults);