import React from 'react';

export default function Register() {
  return(
    <div className='register box'>
      <form>
        <input type='text' placeholder='Name' />
        <input type='text' placeholder='UserName' />
        <input type='password' placeholder='Password' />
        <input type='submit'/>
      </form>
    </div>
  );
}