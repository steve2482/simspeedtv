import React from 'react';
import Channel from './channel';
import {Link} from 'react-router-dom';
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
    if (nextProps.state.user === null || '' || undefined) {
      console.log('user is null');
    }
    else if (this.props.state.user && (nextProps.state.user.favoriteChannels.length !== this.props.state.user.favoriteChannels.length)) {
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
          <Link id='live button' to='/'><h3>View Live Channels</h3></Link> 
          <h3 id='channel-list-header'>Your Favorite Channels</h3>
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
        <Link to='/'><h3 id='live button'>View Live Channels</h3></Link>
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