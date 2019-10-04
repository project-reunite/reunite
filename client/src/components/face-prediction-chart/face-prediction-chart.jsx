import React from 'react';
import PropTypes from 'prop-types';

import {
  Radar, RadarChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid,
} from 'recharts';

const FacePredictionChart = (props) => {
  const { data, size } = props;
  return (
    <RadarChart
      polarRadius={size}
      outerRadius={size}
      width={3.8 * size}
      height={2.5 * size}
      data={data}
    >
      <PolarAngleAxis tick={{ fontSize: 20, fontWeight: 'bold' }} dataKey="feature" />
      <PolarGrid />
      <Radar dataKey="data" stroke="#132832" fill="#61B7E1" fillOpacity={0.6} />
      <PolarRadiusAxis domain={[0, 1]} tickCount={5} />
    </RadarChart>
  );
};

FacePredictionChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  size: PropTypes.number.isRequired,
};

export default FacePredictionChart;
