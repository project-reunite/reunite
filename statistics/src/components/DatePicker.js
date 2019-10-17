import React, { Component, useState, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DatePicker = (props) => {
  const { handleDayClick, selectedDay } = props;
  return (
    <div>
      <div className="row">
        <DayPicker onDayClick={() => handleDayClick(selectedDay)} />
      </div>
      {selectedDay ? (
        <p>You clicked {selectedDay.toLocaleDateString()}</p>
      ) : (
          <p>Please select a day.</p>
        )}
    </div>
  )
}

export default DatePicker;
