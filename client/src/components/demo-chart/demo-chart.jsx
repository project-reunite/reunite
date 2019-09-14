import React from 'react';
import { BarChart, Bar, XAxis } from 'recharts';
import useWindowSize from '../../hooks/useWindowSize';

import CustomizedLabel from './customized-label';

const DemoChart = (props) => {
  const { demoSummaryData } = props;
  const { numberOfPhotosRequiredByExistingSolutions, numberOfPhotosSeen } = demoSummaryData;

  const size = useWindowSize();
  const isMobile = size.width < 600;
  const width = isMobile ? 300 : 400;
  const height = isMobile ? 180 : 300;
  const dx = isMobile ? 55 : 70;

  const data = [
    {
      'Existing solution': numberOfPhotosRequiredByExistingSolutions,
      'Using Reunite': numberOfPhotosSeen,
    },
  ];
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 30,
        right: 25,
        left: 10,
        bottom: -20,
      }}
    >
      <XAxis dataKey="name" />
      <Bar
        dataKey="Existing solution"
        fill="#61B7E1"
        label={<CustomizedLabel key="Existing solution" dx={dx} />}
        animationDuration={1000}
      />
      <Bar
        dataKey="Using Reunite"
        fill="#132832"
        label={<CustomizedLabel key="Using Reunite" dx={dx} />}
        animationDuration={1000}
        animationBegin={1500}
      />
    </BarChart>
  );
};

export default DemoChart;
