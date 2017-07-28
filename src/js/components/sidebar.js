import React from 'react';
import Channel from './channel';
import {Link} from 'react-router-dom';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';
import '../../css/Sidebar.css';

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
    let allChannels = this.props.state.channelNames;
    // Filter out tv-style channels
    let allTVChannels = [];
    for (let i = 0; i < allChannels.length; i++) {
      if (allChannels[i].type === 'tv-style') {
        allTVChannels.push(allChannels[i]);
      }
    }

    // Build tv-style channel list
    const tvChannels = allTVChannels.map((channelId, index) => {
      const channel = allTVChannels[index];
      return (
        <li key={index}>
          <Channel key={index} name={channel.abreviatedName} favorites={channel.favorites} />
        </li>
      );
    });

    // Filter out news/review channels
    let allNewsChannels = [];
    for (let i = 0; i < allChannels.length; i++) {
      if (allChannels[i].type === 'news') {
        allNewsChannels.push(allChannels[i]);
      }
    }

    // Build news channel list
    const newsChannels = allNewsChannels.map((channelId, index) => {
      const channel = allNewsChannels[index];
      return (
        <li key={index}>
          <Channel key={index} name={channel.abreviatedName} favorites={channel.favorites} />
        </li>
      );
    });

    // Filter out POV channels
    let allPOVChannels = [];
    for (let i = 0; i < allChannels.length; i++) {
      if (allChannels[i].type === 'pov') {
        allPOVChannels.push(allChannels[i]);
      }
    }

    // Build POV channel list
    const POVChannels = allPOVChannels.map((channelId, index) => {
      const channel = allPOVChannels[index];
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
        <div>
          <div className='sidebar-focus-shadow' style={{display: this.props.state.showMenu ? 'block' : 'none'}}>
          </div>
          <div className='sidebar' style={{display: this.props.state.showMenu ? 'block' : 'none' }}>
            <Link to='/'><h3 className='live'>View Live Channels</h3></Link> 
            <h1 className='channel-list-header'>Your Favorite Channels</h1>
            <ul className='channelList favorites'>
              {favoriteChannels}
            </ul>
            <h1 className='channel-list-header'>Channel List(Favorites)</h1>
            <h2 className='channel-list-header sub-header'>Broadcasters</h2>
            <ul className='channelList'>
              {tvChannels}
            </ul>
            <h2 className='channel-list-header sub-header'>Info, News & Reviews</h2>
            <ul className='channelList'>
              {newsChannels}
            </ul>
            <h2 className='channel-list-header sub-header'>POV Content Creaters</h2>
            <ul className='channelList'>
              {POVChannels}
            </ul>        
          </div>
        </div>
      );
    }

    // Guest User
    return (
      <div>
        <div className='sidebar-focus-shadow' style={{display: this.props.state.showMenu ? 'block' : 'none'}}>
        </div>
        <div className='sidebar' style={{display: this.props.state.showMenu ? 'block' : 'none' }}>
          <Link to='/'><h3 className='live'>View Live Channels</h3></Link>
          <h1 className='channel-list-header'>Channel List(Favorites)</h1>
          <h2 className='channel-list-header sub-header'>Broadcasters</h2>
          <ul className='channelList'>
            {tvChannels}
          </ul>
          <h2 className='channel-list-header sub-header'>Info, News & Reviews</h2>
          <ul className='channelList'>
            {newsChannels}
          </ul>
          <h2 className='channel-list-header sub-header'>POV Content Creaters</h2>
          <ul className='channelList'>
            {POVChannels}
          </ul>              
        </div>
      </div>
    );
  }  
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Sidebar);