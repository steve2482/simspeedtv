import React from 'react';
import Video from './video';

import * as actions from '../actions/index';
import {connect} from 'react-redux';

export class LiveResults extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(
      actions.getLiveBroadcasts()
    );
	}

  render() {
    console.log(this.props.state.liveBroadcasts);

    // Check if any results, if none, display message to instruct user to select a channel
    let message = 'Choose a live broadcast or choose your favorite channel from the channel guide.' 
    for (let i = 0; i < this.props.state.liveBroadcasts.length; i++) {
      let numberOfBroadcasts = 0;
      if (this.props.state.liveBroadcasts[i].items.length > 0) {
        numberOfBroadcasts++;
      }
      if (numberOfBroadcasts === 0) {
        message = 'There are currently no races being broadcast live. Choose a channel from the channel guide to see previously broadcast races.';
      }
    }

    return (
      <div className='live-results box'>
        <h3>Current Live Broadcasts</h3>
        <p className='message'>{message}</p>
        <Video />
      </div>
    );
  }  
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(LiveResults);