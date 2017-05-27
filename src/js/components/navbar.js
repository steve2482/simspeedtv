import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.userLogout = this.userLogout.bind(this);
  }

  userLogout(e) {
    e.preventDefault();
    this.props.dispatch(
      actions.logoutUser(this.props.state.user)
    );
  }

  render() {
    console.log(this.props.state);
    if (this.props.state.user) {
      return (
        <div className='navbar box'>
        <h3 className='title'><Link to='/'>SimSpeedTV</Link></h3>
        <ul className='nav-buttons'>
          <li><Link to='/sign-in' onClick={this.userLogout}>Logout</Link></li>
        </ul>
      </div>
      );
    }
    return (
      <div className='navbar box'>
        <h3 className='title'><Link to='/'>SimSpeedTV</Link></h3>
        <ul className='nav-buttons'>
          <li><Link to='/sign-in'>Sign-In</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Navbar);