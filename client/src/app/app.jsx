import React from 'react';
import { ThemeProvider } from 'mineral-ui/themes';
import Dashboard from '../components/dashboard';
import './app.scss';

const App = () => (
  <ThemeProvider>
    <Dashboard />
  </ThemeProvider>
);

export default App;
