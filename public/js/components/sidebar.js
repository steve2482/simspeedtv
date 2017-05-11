import React from 'react';
import {Link} from 'react-router-dom';
import Channel from './channel';
import CHANNELS from '../channels';
import * as actions from '../actions/index';
import {connect} from 'react-redux';

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(
      actions.getChannelNames()
    );
    console.log(this.props.state);
  }

  render() {
    const channels = this.props.state.channelNames.map((channelId, index) => {
      const channel = this.props.state.channelNames[channelId];
      return (
        <li key={index}>
          <Channel key={index} name={channel.abreviatedName} id={channel.youtubeId} />
        </li>
      );
    });

    return (
      <div className='sidebar box'>
        <h4 id='channel-list-header'>Channel List</h4>
        <ul>
          {channels}
        </ul>      
      </div>
    );
  }  
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Sidebar);