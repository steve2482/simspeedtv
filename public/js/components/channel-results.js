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

  render() {
    const channelName = this.props.match.params.channelName;
    console.log(this.props.state.channelVideos);

    return (
  		<div className='channel-results box'>
  			<h3>{channelName}</h3>
        <Video info={this.props.state.channelVideos} />
  		</div>
  	);
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(ChannelResults);