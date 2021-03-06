import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis } from 'recharts';
import useWindowSize from '../../../hooks/useWindowSize';

import CustomizedLabel from './customized-label';

const DemoChart = (props) => {
  const { demoSummaryData } = props;
  const { numPhotosViaExistingSolutions, numPhotosSeen } = demoSummaryData;
  const [chartWidth, setChartWidth] = useState();
  const [chartHeight, setChartHeight] = useState();
  const [labeldx, setLabeldx] = useState();

  const size = useWindowSize();

  useEffect(() => {
    const isMobile = size.width < 600;
    setChartWidth(isMobile ? 300 : 400);
    setChartHeight(isMobile ? 170 : 300);
    setLabeldx(isMobile ? 55 : 70);
  }, [size]);

  const data = [
    {
      'Existing solution': numPhotosViaExistingSolutions,
      'Using Reunite': numPhotosSeen,
    },
  ];

  return (
    <BarChart
      width={chartWidth}
      className="demoChart"
      height={chartHeight}
      data={data}
      margin={{
        top: 0,
        right: 10,
        left: 10,
        bottom: -10,
      }}
    >
      <XAxis dataKey="name" />
      <Bar
        dataKey="Existing solution"
        fill="#132832"
        label={<CustomizedLabel key="Existing solution" dx={labeldx} />}
        animationDuration={1000}
      />
      <Bar
        dataKey="Using Reunite"
        fill="#61B7E1"
        label={<CustomizedLabel key="Using Reunite" dx={labeldx} />}
        animationDuration={1000}
        animationBegin={1500}
      />
    </BarChart>
  );
};

DemoChart.defaultProps = {
  demoSummaryData: {},
};

DemoChart.propTypes = {
  demoSummaryData: PropTypes.objectOf(PropTypes.number),
};

export default DemoChart;
