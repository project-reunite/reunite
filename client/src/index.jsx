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

serviceWorker.unregister();
