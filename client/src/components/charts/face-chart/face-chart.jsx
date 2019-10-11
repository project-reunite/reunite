import React from 'react';
import PropTypes from 'prop-types';

import {
  Radar, RadarChart, PolarRadiusAxis,
} from 'recharts';

const FaceChart = (props) => {
  const { data, size } = props;
  return (
    <RadarChart
      outerRadius={size}
      innerRadius={2 * size / 3}
      width={2 * size}
      height={2 * size}
      data={data}
    >
      <Radar dataKey="A" stroke="#132832" fill="#61B7E1" fillOpacity={0.6} />
      <PolarRadiusAxis tick={false} tickCount={3} axisLine={false} />
    </RadarChart>
  );
};

FaceChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
  size: PropTypes.number.isRequired,
};

export default FaceChart;
