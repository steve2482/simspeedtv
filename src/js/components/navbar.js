import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import '../../css/Navbar.css';
import FaBars from 'react-icons/lib/fa/bars';
import Img from '../../css/images/simracertv_logo.png';

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
          <div className='menu-button'>
            <FaBars />
          </div>
          <Link to='/'><img className='logo' src={Img} alt={'SimRacerTV'} /></Link>
          <ul className='nav-buttons'>
            <li className='nav-button logout'><Link to='/sign-in' onClick={this.userLogout}>Logout</Link></li>
          </ul>
        </div>
      );
    }
    return (
      <div className='navbar'>
        <div className='menu-button'>
          <FaBars />
        </div>
        <Link to='/'><img className='logo' src={Img} alt={'SimRacerTV'} /></Link>
        <ul className='nav-buttons'>
          <li className='nav-button'><Link to='/sign-in'>Sign-In</Link></li>
          <li className='nav-button'><Link to='/register'>Register</Link></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Navbar);