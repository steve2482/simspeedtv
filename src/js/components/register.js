import React from 'react';
import * as actions from '../actions/actions';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(e) {
    e.preventDefault();
    const newUser = {
      name: this.refs.name.value,
      userName: this.refs.userName.value,
      password: this.refs.password.value
    };
    this.props.dispatch(
      actions.registerUser(newUser)
    );
  }

  render() {
    return(
      <div className='register box'>
        <form onSubmit={this.registerUser}>
          <input type='text' ref='name' placeholder='Name' />
          <input type='text' ref='userName' placeholder='UserName' />
          <input type='password' ref='password' placeholder='Password' />
          <input type='submit'/>
        </form>
      </div>
    );
  }
}
