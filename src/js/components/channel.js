import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

export class Channel extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleMenu() {
    this.props.dispatch(
      actions.toggleSidebar());
  }

  render() {
    // If Favorite Channels List
    if (this.props.favorites === undefined) {
      return (
        <div>
          <strong>
            <Link to={'/channels/' + this.props.name} className='channelName' onClick={this.toggleMenu}>
              {this.props.name}
            </Link>
          </strong>
        </div>
      );
    }
    // If Channel List
    else {
      return (
        <div>
          <strong>
            <Link to={'/channels/' + this.props.name} className='channelName' onClick={this.toggleMenu}>
              {this.props.name}({this.props.favorites})
            </Link>
          </strong>
          <p className='favorite-count'></p>
        </div>
      );
    }
  }  
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Channel);