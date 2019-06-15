import React from 'react';

import Deck from './Deck';
import Header from './Header';

const Dashboard = () => ([
  <Header key="1" />,
  <h2
    key="2"
    style={{
      paddingLeft: '30px',
    }}
  >
    {' '}
UI Services
  </h2>,
  <Deck key="3" />,
]);

export default Dashboard;
