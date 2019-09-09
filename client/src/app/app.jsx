import React, { useState } from 'react';
import { ThemeProvider } from 'mineral-ui/themes';
import LocaleContext from '../locale-context.js';
import Dashboard from '../components/dashboard';
import './app.scss';

const App = () => {
  const [preferredLocale, setPreferredLocale] = useState('en');

  const changeLanguage = (id) => {
    setPreferredLocale(id);
  };

  return (
    <LocaleContext.Provider value={preferredLocale}>
      <ThemeProvider>
        <Dashboard changeLanguage={changeLanguage} />
      </ThemeProvider>
    </LocaleContext.Provider>
  );
};

export default App;
