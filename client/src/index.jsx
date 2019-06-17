import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Router, Route, hashHistory } from 'react-router';
import App from './app';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
