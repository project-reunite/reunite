import React from 'react';
import PropTypes from 'prop-types';

import {
  Radar, RadarChart,
} from 'recharts';

const FaceChart = (props) => {
  const { data, size } = props;
  return (
    <RadarChart polarRadius={size / 2} innerRadius={size / 4} width={size} height={size} data={data}>
      <Radar dataKey="A" stroke="#132832" fill="#61B7E1" fillOpacity={0.6} />
    </RadarChart>
  );
};

FaceChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
  size: PropTypes.number.isRequired,
};

export default FaceChart;
