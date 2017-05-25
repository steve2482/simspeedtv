import React from 'react';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.userLogIn = this.userLogIn.bind(this);
  }

  userLogIn(e) {
    e.preventDefault();
    const user = {
      username: this.refs.userName.value,
      password: this.refs.password.value
    };
    console.log(user);
    this.props.dispatch(
      actions.userLogIn(user, this.props.history)
    );
  }

  render() {
    console.log(this.props.state);
    return(
      <div className='sign-in box'>
        <form onSubmit={this.userLogIn}>
          <input type='text' ref='userName' placeholder='UserName'/>
          <input type='password' ref='password' placeholder='Password'/>
          <input type='submit'/> 
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state: state
});

export default connect(mapStateToProps)(SignIn);
