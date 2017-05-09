import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Navbar from './navbar';
import Sidebar from './sidebar';
import LiveResults from './live-results';
import ChannelResults from './channel-results';

export default function App() {
  return (
    <Router>
      <div className='layout'>
        <Navbar />
        <Sidebar />
        <main className='results-window'>
          <Route exact path='/' component={LiveResults} />
          <Route exact path='/channel' component={ChannelResults} />
        </main>
      </div>
    </Router>
  );
}