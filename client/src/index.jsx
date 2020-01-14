import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Router, Route, hashHistory } from 'react-router';
import App from './app';
import MissingPeopleScreen from './components/screens/missing-people-screen';
import VisualiserScreen from './components/screens/demo-visualiser-screen';
import VisualiserControlPanel from './components/screens/visualiser-control-panel';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/missing-people" component={MissingPeopleScreen} />
    <Route path="/visualiser" component={VisualiserScreen} />
    <Route path="/visualiser/control" component={VisualiserControlPanel} />
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
