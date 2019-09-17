import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'mineral-ui/themes';
import LocaleContext from '../locale-context';
import Dashboard from '../components/dashboard';
import apiRequests from '../utils/apiRequests';
import './app.scss';

const App = () => {
  const [preferredLocale, setPreferredLocale] = useState('en');
  const [username, setUsername] = useState('');

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const response = await apiRequests.postUser();
      if (mounted) {
        setUsername(response.data);
      } else {
        apiRequests.deleteUser(username);
      }
    }
    fetchData();
    // useEffect cleanup function, avoids setting state on unmounted component
    return () => {
      mounted = false;
    };
  }, []);

  const changeLanguage = (id) => {
    setPreferredLocale(id);
  };

  return (
    <LocaleContext.Provider value={preferredLocale}>
      <ThemeProvider>
        <Dashboard username={username} changeLanguage={changeLanguage} />
      </ThemeProvider>
    </LocaleContext.Provider>
  );
};

export default App;
