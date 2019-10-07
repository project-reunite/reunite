import React from 'react';
import PropTypes from 'prop-types';

import {
  Radar, RadarChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid,
} from 'recharts';

const FacePredictionChart = (props) => {
  const { data, size } = props;
  return (
    <RadarChart
      outerRadius={size}
      innerRadius={2 * size / 3}
      width={3.8 * size}
      height={2.5 * size}
      data={data}
    >
      <PolarAngleAxis tick={{ fontSize: 20, fontWeight: 'bold' }} dataKey="feature" />
      <PolarGrid
        stroke="#bebebe"
        gridType="circle"
      />
      <Radar dataKey="data" stroke="#132832" fillOpacity={0.6} />
      <PolarRadiusAxis fill="8c8c8c" domain={[0, 1]} tickCount={3} />
    </RadarChart>
  );
};


FacePredictionChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  size: PropTypes.number.isRequired,
};

export default FacePredictionChart;
