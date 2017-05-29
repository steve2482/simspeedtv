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

  componentWillReceiveProps(nextProps) {
    console.log('nextProps:', nextProps.state.user.favoriteChannels)
    console.log('this:', this.props.state.user.favoriteChannels)
    if (this.props.state.user && (nextProps.state.user.favoriteChannels.length !== this.props.state.user.favoriteChannels.length)) {
      this.props.dispatch(
        actions.getChannelNames()
      );
    }
  }

  render() {
    const channels = this.props.state.channelNames.map((channelId, index) => {
      const channel = this.props.state.channelNames[index];
      return (
        <li key={index}>
          <Channel key={index} name={channel.abreviatedName} favorites={channel.favorites} />
        </li>
      );
    });
    // If User is signed in
    if (this.props.state.user) {
      const favoriteChannels = this.props.state.user.favoriteChannels.map((channel, index) => {
        const favoriteChannel = channel;
        return (
          <li key={index}>
            <Channel name={favoriteChannel} />
          </li>
        );
      });
      return (
        <div className='sidebar box'>
          <h3 id='channel-list-header'>{this.props.state.user.userName}'s Favorite Channels</h3>
          <ul>
            {favoriteChannels}
          </ul>
          <h3 id='channel-list-header'>Channel List(Favorites)</h3>
          <ul>
            {channels}
          </ul>      
        </div>
      );
    }
    // Guest User
    return (
      <div className='sidebar box'>
        <h3 id='channel-list-header'>Channel List(Favorites)</h3>
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