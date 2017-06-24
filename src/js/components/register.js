import React from 'react';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';
import Error from './error';
import '../../css/signin-registration.css';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(actions.setErrors(null));
  }

  registerUser(e) {
    e.preventDefault();
    const newUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      userName: this.refs.userName.value,
      password: this.refs.password.value,
      password2: this.refs.password2.value
    };
    this.props.dispatch(
      actions.registerNewUser(newUser, this.props.history)
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
        <div className='register box'>
          <form className='form' onSubmit={this.registerUser}>
            <div className='first-register-input name-input'>
              <input type='text' ref='name' placeholder='Name' />
            </div>
            <div className='email-input'>
              <input type='email' ref='email' placeholder='Email' />
            </div>
            <div className='userName-input'>
              <input type='text' ref='userName' placeholder='UserName' />
            </div>
            <div className='password-input'>
              <input type='password' ref='password' placeholder='Password' />
            </div>
            <div className='password2-input'>
              <input type='password' ref='password2' placeholder='Re-type Password' />
            </div>
            <input className='sub-button' type='submit'/>
          </form>
          {errors}
        </div>
      );
    }
    else {
      return (
        <div className='register box'>
          <form className='form' onSubmit={this.registerUser}>
            <div className='first-register-input name-input'>
              <input type='text' ref='name' placeholder='Name' />
            </div>
            <div className='email-input'>
              <input type='email' ref='email' placeholder='Email' />
            </div>
            <div className='userName-input'>
              <input type='text' ref='userName' placeholder='UserName' />
            </div>
            <div className='password-input'>
              <input type='password' ref='password' placeholder='Password' />
            </div>
            <div className='password2-input'>
              <input type='password' ref='password2' placeholder='Re-type Password' />
            </div>
            <input className='sub-button' type='submit'/>
          </form>
        </div>
      );
    }    
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Register);
