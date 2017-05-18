import React from 'react';

export default function SignIn() {
  return(
    <div className='sign-in box'>
      <form>
        <input type='text' placeholder='UserName'/>
        <input type='password' placeholder='Password'/>
        <input type='submit'/> 
      </form>
    </div>
  );
}