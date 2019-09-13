import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Label, Tooltip,
} from 'recharts';

import Translate from '../../locales/en.json';

const renderLegendEntry = value => (
  <span style={{ lineHeight: '2em', fontSize: '12px' }}>{value}</span>
);

const nextMultipleOfTen = (number) => {
  let workingNumber = number;
  for (let i = 0; i < 10; i + 1) {
    if (workingNumber % 10 === 0) {
      return workingNumber;
    }
    workingNumber += 1;
  }
  return workingNumber;
};

const Example = (props) => {
  const { demoSummaryData } = props;
  const {
    numberOfPhotosInTotal,
    numberOfPhotosRequiredByExistingSolutions,
    numberOfPhotosSeen,
  } = demoSummaryData;

  const message1 = (
    <Translate string="stats-summary-1" />
  );

  const data = [
    {
      'Using existing solution (on average)': numberOfPhotosRequiredByExistingSolutions,
      'Using the Reunite app': numberOfPhotosSeen,
    },
  ];
  return (
    <BarChart
      width={300}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 25,
        left: 10,
        bottom: 25,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, nextMultipleOfTen(numberOfPhotosRequiredByExistingSolutions)]} />
      <Tooltip />
      <Legend
        formatter={renderLegendEntry}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 25,
        }}
        verticalAlign="bottom"
        align="center"
      />
      {/* <Bar dataKey="Maximum number" fill="#61B7E1" label={<CustomizedLabel />} /> */}
      <Bar
        dataKey="Using existing solution (on average)"
        fill="#61B7E1"
        label={<CustomizedLabel />}
      />
      <Bar dataKey="Using the Reunite app" fill="#132832" label={<CustomizedLabel />} />
    </BarChart>
  );
};

const CustomizedLabel = (props) => {
  const {
    x, y, fill, value,
  } = props;
  return (
    <text
      x={x}
      y={y}
      dy={-5}
      dx={40}
      fontSize="12"
      fontFamily="Open Sans"
      fill={fill}
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

export default Example;
