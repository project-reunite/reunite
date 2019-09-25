import React from 'react';
import PropTypes from 'prop-types';

import {
  Radar, RadarChart,
} from 'recharts';

const FaceChart = (props) => {
  const { data, size } = props;
  return (
    <RadarChart polarRadius={[100]} outerRadius={size / 2} width={size} height={size} data={data}>
      <Radar dataKey="A" stroke="#132832" fill="#61B7E1" fillOpacity={0.6} />
    </RadarChart>
  );
};

FaceChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
};

export default FaceChart;
