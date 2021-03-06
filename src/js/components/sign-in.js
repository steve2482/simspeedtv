import React from 'react';
import Error from './error';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';

import '../../css/signin-registration.css';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.userLogIn = this.userLogIn.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(actions.setErrors(null));
  }

  userLogIn(e) {
    e.preventDefault();
    const user = {
      username: this.refs.userName.value,
      password: this.refs.password.value
    };
    this.props.dispatch(
      actions.userLogIn(user, this.props.history)
    );
  }

  render() {
    if (this.props.state.errors) {
      let allErrors = [];
      for (let i = 0; i < this.props.state.errors.length; i++) {
        allErrors.push(this.props.state.errors[i].msg);
      }      
      const errors = allErrors.map((eachError, index) => {
        const error = eachError;
        return (
          <Error key={index} message={error}/>
        );
      });
      return(
        <div className='sign-in box'>
          <form className='form' onSubmit={this.userLogIn}>
            <div className='first-input userName-input'>
              <input type='text' ref='userName' placeholder='UserName'/>
            </div>
            <div className='password-input'>
              <input type='password' ref='password' placeholder='Password'/>
            </div>
            <input className='sub-button' type='submit'/> 
          </form>
          <div className='errors'>
            {errors}
          </div>
        </div>
      );
    }
    else {
      return (
        <div className='sign-in box'>
          <form className='form' onSubmit={this.userLogIn}>
            <div className='first-input userName-input'>
              <input type='text' ref='userName' placeholder='UserName'/>
            </div>
            <div className='password-input'>
              <input type='password' ref='password' placeholder='Password'/>
            </div>
            <input className='sub-button' type='submit'/> 
          </form>
        </div>
      )
    }  
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(SignIn);
