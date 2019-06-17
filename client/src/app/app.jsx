import React from 'react';
import { ThemeProvider } from 'mineral-ui/themes';
import Dashboard from '../components/dashboard';
import './app.scss';

const App = () => (
  <ThemeProvider>
    <Dashboard css={{
      padding: '300px',
    }}
    />
  </ThemeProvider>
);

export default App;
