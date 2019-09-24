import React from 'react';
import PropTypes from 'prop-types';

import {
  Radar, RadarChart,
} from 'recharts';

const FaceChart = (props) => {
  const { data } = props;
  return (
    <RadarChart polarRadius={[100]} outerRadius={100} width={200} height={200} data={data}>
      <Radar dataKey="A" stroke="#132832" fill="#61B7E1" fillOpacity={0.6} />
    </RadarChart>
  );
};

FaceChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
};

export default FaceChart;
