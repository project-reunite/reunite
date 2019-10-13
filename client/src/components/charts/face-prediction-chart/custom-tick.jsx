import React from 'react';
import PropTypes from 'prop-types';

const getColor = (value) => {
  const confidenceLevel = Math.abs(0.5 - value);
  return `rgb(150, ${450 * confidenceLevel}, 0)`;
};

const CustomTick = (props) => {
  const {
    x, y, payload, textAnchor, data,
  } = props;
  const { value } = payload;
  const targetFeature = data.filter(feature => feature.feature === value)[0].data;
  const color = getColor(targetFeature);
  return (
    <text
      className="tickLabel"
      fontSize="30"
      x={x}
      y={y}
      textAnchor={textAnchor}
      fontWeight="bold"
      fill={color}
      fontFamily="Open Sans"
    >
      {value}
    </text>
  );
};

CustomTick.defaultProps = {
  x: 0,
  y: 0,
  payload: {},
};

CustomTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.objectOf(PropTypes.any),
  textAnchor: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default CustomTick;
