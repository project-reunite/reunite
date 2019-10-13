import React from 'react';
import PropTypes from 'prop-types';

import {
  Radar, RadarChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid,
} from 'recharts';

import CustomTick from './custom-tick';

const FacePredictionChart = (props) => {
  const { data, size } = props;

  return (
    <div className="chart">
      <RadarChart
        outerRadius={size}
        innerRadius={(2 * size) / 3}
        fontWeight="bold"
        width={3.2 * size}
        height={2.5 * size}
        data={data}
      >
        <PolarAngleAxis tick={<CustomTick data={data} />} dataKey="feature" />
        <PolarGrid stroke="#bebebe" gridType="circle" />
        <Radar dataKey="data" fill="#61B7E1" stroke="#132832" fillOpacity={0.6} />
        <PolarRadiusAxis fill="#8c8c8c" domain={[0, 1]} tickCount={3} />
      </RadarChart>
    </div>
  );
};

FacePredictionChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  size: PropTypes.number.isRequired,
};

export default FacePredictionChart;
