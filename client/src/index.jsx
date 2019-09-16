import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Router, Route, hashHistory } from 'react-router';
import App from './app';
import MissingPeopleScreen from './components/missing-people-screen';
import DemoVisualiserScreen from './components/demo-visualiser-screen';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/missing-people" component={MissingPeopleScreen} />
    <Route path="/demo-visualiser" component={DemoVisualiserScreen} />
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
