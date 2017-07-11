// Live Results Window
// ===================
import React from 'react';
import Video from './video';

import * as actions from '../actions/actions';
import {connect} from 'react-redux';
import '../../css/Results-window.css';

export class LiveResults extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.dispatch(
      actions.getLiveBroadcasts()
    );
    this.props.dispatch(
      actions.getUpcomingBroadcasts()
    );
  }

  render() {
    // Application Description
    const description = 'Welcome to SimRacerTV. We bring all your favorite simracing broadcasters to one convienent location. Currently, we feature 19 different TV style broadcasters. In the future, we will be including simracing news channels, as well as POV streamers. Enjoy the races!';

    // User Features Description
    const userFeaturesDescription = 'User registration is not needed to to use the application, though if you do, you will be able to favorite channels, making them easier to find the next time you visit.';

    // Message when there are current live broadcasts
    let message = 'Watch a live broadcast or choose your favorite channel from the channel guide to view past broadcasts.';

    // Get upcoming broadcast info
    let upcomingBroadcasts = this.props.state.upcomingBroadcasts.map((broadcast, index) => {
      const broadcastInfo = broadcast;
      return (
        <Video key={index} upcomingInfo={broadcastInfo} />
      );
    });

    // Set number of current live broadcasts to 0
    let numberOfBroadcasts = 0;
    let broadcasts = null;

    // Check if any live broadcasts, if none, display message to instruct user to select a channel
    for (let i = 0; i < this.props.state.liveBroadcasts.length; i++) {      
      if (this.props.state.liveBroadcasts[i].items.length > 0) {
        numberOfBroadcasts++;
      }
    }
    if (numberOfBroadcasts === 0) {
      message = 'There are currently no races being broadcast live. Live broadcasts typically occur nights and weekends. Choose a channel from the channel guide to see previously broadcast races.';
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

      // HTML when NO live broadcast
      return (
      <div className='live-results box'>
        <div className='text-box'>
          <p className='description'>{description}</p>
          <p className='userFeaturesDescription'>{userFeaturesDescription}</p>
          <h3>Current Live Broadcasts</h3>
          <p className='message'>{message}</p>
        </div>
        <div className='video-container'>
        {broadcasts}
        </div>
        <div className='upcoming-broadcasts text-box'>
          <h3>Upcoming Broadcasts</h3>
        </div>
        <div className='video-container'>
          {upcomingBroadcasts}
        </div>
      </div>
      );     
    }

    // HTML when there IS live broadcasts
    return (
      <div className='live-results box'>
        <div className='text-box'>
          <p className='description'>{description}</p>
          <p className='userFeaturesDescription'>{userFeaturesDescription}</p>
          <h3>Current Live Broadcasts</h3>
          <p className='message'>{message}</p>
        </div>
        <div className='video-container'>
        {broadcasts}
        </div>
        <div className='upcoming-broadcasts text-box'>
          <h3>Upcoming Broadcasts</h3>
        </div>
        <div className='video-container'>
          {upcomingBroadcasts}
        </div>
      </div>
    );    
  }  
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(LiveResults);