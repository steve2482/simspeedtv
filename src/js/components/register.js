import React from 'react';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';
import Error from './error';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
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
          <form onSubmit={this.registerUser}>
            <input type='text' ref='name' placeholder='Name' />
            <input type='email' ref='email' placeholder='Email' />
            <input type='text' ref='userName' placeholder='UserName' />
            <input type='password' ref='password' placeholder='Password' />
            <input type='password' ref='password2' placeholder='Re-type Password' />
            <input type='submit'/>
          </form>
          {errors}
        </div>
      );
    }
    else {
      return (
        <div className='register box'>
          <form onSubmit={this.registerUser}>
            <input type='text' ref='name' placeholder='Name' />
            <input type='email' ref='email' placeholder='Email' />
            <input type='text' ref='userName' placeholder='UserName' />
            <input type='password' ref='password' placeholder='Password' />
            <input type='password' ref='password2' placeholder='Re-type Password' />
            <input type='submit'/>
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
