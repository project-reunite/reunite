import React, { useState } from 'react';
import './App.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
// import DatePicker from './components/DatePicker';
import Dashboard from './components/Dashboard';

// const PROJECT_START_DATE = new Date(1560553200000); // 15/06/2019

const App = () => {
  const [selectedDay, setSelectedDay] = useState(undefined);
  // const date = new Date();
  // const dateLabel = `${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`

  const handleDayClick = (day) => {
    if (day !== selectedDay) {
      setSelectedDay(day);
    }
  }

  return (
    <div className="App">
      <Dashboard selectedDay={selectedDay} />
      <div className="row">
        <DayPicker onDayClick={handleDayClick} />
      </div>
      {selectedDay ? (
        <p>You clicked {selectedDay.toLocaleDateString()}</p>
      ) : (
          <p>Please select a day.</p>
        )}
    </div>
  );
}

export default App;
