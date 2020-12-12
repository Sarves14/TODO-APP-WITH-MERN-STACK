import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import store from './store/store';



store.dispatch({ type: 'action' });




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

