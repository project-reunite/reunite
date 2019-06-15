import React from 'react';
import { ThemeProvider } from 'mineral-ui/themes';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
    <ThemeProvider>
      <Dashboard css={{
          padding: '300px',
        }}/>
    </ThemeProvider>
  
  );
}

// render(<App />, document.getElementById('app'));

export default App;
