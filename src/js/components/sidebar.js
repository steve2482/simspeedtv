import React from 'react';
import Channel from './channel';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(
      actions.getChannelNames()
    );
  }

  render() {
    console.log(this.props.state);
    const channels = this.props.state.channelNames.map((channelId, index) => {
      const channel = this.props.state.channelNames[index];
      return (
        <li key={index}>
          <Channel key={index} name={channel} />
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