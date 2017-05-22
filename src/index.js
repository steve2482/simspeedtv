require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './js/components/app';
import './css/index.css';
import store from './store';

ReactDOM.render(
	<Provider store={store}>	
    <App />
  </Provider>,
  document.getElementById('app')
);
