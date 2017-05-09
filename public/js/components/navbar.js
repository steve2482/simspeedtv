import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar box'>
      <h3 className='title'><Link to='/'>SimSpeedTV</Link></h3>
      <ul className='nav-buttons'>
        <li>Sign-In</li>
        <li>Register</li>
      </ul>
    </div>
  );
}