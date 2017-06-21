import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import '../../css/Navbar.css';

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
    if (this.props.state.user) {
      return (
        <div className='navbar'>
          <h1 className='title'><Link to='/'>SimRacerTV</Link></h1>
          <ul className='nav-buttons'>
            <li><Link to='/sign-in' onClick={this.userLogout}>Logout</Link></li>
          </ul>
        </div>
      );
    }
    return (
      <div className='navbar'>
        <h1 className='title'><Link to='/'>SimRacerTV</Link></h1>
        <ul className='nav-buttons'>
          <li className='button'><Link to='/sign-in'>Sign-In</Link></li>
          <li className='button'><Link to='/register'>Register</Link></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Navbar);