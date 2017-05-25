import React from 'react';
import Channel from './channel';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';

export class Sidebar extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.dispatch(
      actions.getChannelNames()
    );
  }

  render() {
    const channels = this.props.state.channelNames.map((channelId, index) => {
      const channel = this.props.state.channelNames[index];
      return (
        <li key={index}>
          <Channel key={index} name={channel} />
        </li>
      );
    });
    if (this.props.state.user) {
      return (
        <div className='sidebar box'>
          <h3>{this.props.state.user.userName}'s Favorite Channels</h3>
          <h3 id='channel-list-header'>Channel List</h3>
          <ul>
            {channels}
          </ul>      
        </div>
      );
    }
    return (
      <div className='sidebar box'>
        <h3 id='channel-list-header'>Channel List</h3>
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