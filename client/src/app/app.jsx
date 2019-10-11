import React, { useState } from 'react';
import { ThemeProvider } from 'mineral-ui/themes';
import LocaleContext from '../locale-context';
import MainAppScreen from '../components/screens/main-app-screen';
import './app.scss';

const App = () => {
  const [preferredLocale, setPreferredLocale] = useState('en');

  const changeLanguage = (id) => {
    setPreferredLocale(id);
  };

  return (
    <LocaleContext.Provider value={preferredLocale}>
      <ThemeProvider>
        <MainAppScreen changeLanguage={changeLanguage} />
      </ThemeProvider>
    </LocaleContext.Provider>
  );
};

export default App;
