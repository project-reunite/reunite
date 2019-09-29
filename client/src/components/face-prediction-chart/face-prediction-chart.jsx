import React from 'react';
import PropTypes from 'prop-types';

import {
  Radar, RadarChart, PolarAngleAxis,
} from 'recharts';

const FacePredictionChart = (props) => {
  const { data, size } = props;
  return (
    <RadarChart
      polarRadius={[size]}
      outerRadius={size}
      width={3.8 * size}
      height={2.5 * size}
      data={data}
    >
      <PolarAngleAxis dataKey="feature" />
      <Radar dataKey="data" stroke="#132832" fill="#61B7E1" fillOpacity={0.6} />
    </RadarChart>
  );
};

FacePredictionChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
  size: PropTypes.number.isRequired,
};

export default FacePredictionChart;
