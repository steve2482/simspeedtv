import React from 'react';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';

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
      password: this.refs.password2.value
    };
    this.props.dispatch(
      actions.registerNewUser(newUser)
    );
  }

  render() {
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
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(Register);
