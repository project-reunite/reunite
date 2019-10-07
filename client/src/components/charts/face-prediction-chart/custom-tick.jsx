import React from 'react';
import PropTypes from 'prop-types';

const CustomTick = (props) => {
  const {
    x, y, payload, textAnchor, data,
  } = props;
  const { value } = payload;
  const targetFeature = data.filter(feature => feature.feature === value)[0].data;
  const color = (targetFeature < 0.2 || targetFeature > 0.8)
    ? 'green'
    : 'red';
  return (
    <text
      className="tickLabel"
      fontSize="20"
      color="green"
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
  textAnchor: 'end',
};

CustomTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.objectOf(PropTypes.any),
  textAnchor: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default CustomTick;
