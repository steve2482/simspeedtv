import React from 'react';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom';

import Navbar from './navbar';
import Sidebar from './sidebar';
import LiveResults from './live-results';
import ChannelResults from './channel-results';
import SignIn from './sign-in';
import Register from './register';
import TVScreen from './tv-screen';

export default function App() {
  return (
    <Router history={browserHistory}>
      <div className='layout'>
        <Navbar />
        <Sidebar />
        <main className='results-window'>
          <Route exact path='/' component={LiveResults} />
          <Route exact path='/video/:videoId' component={TVScreen} />
          <Route exact path='/channels/:channelName' component={ChannelResults} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/register' component={Register} />
        </main>
      </div>
    </Router>
  );
}