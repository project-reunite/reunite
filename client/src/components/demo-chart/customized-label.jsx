import PropTypes from 'prop-types';
import React from 'react';

import Translate from '../../locales/translate';

const existingSolutionLabel = <Translate string="stats-summary-1" />;

const reuniteLabel = <Translate string="stats-summary-2" />;

const keyToLabel = {
  'Existing solution': existingSolutionLabel,
  'Using Reunite': reuniteLabel,
};

const CustomizedLabel = (props) => {
  const {
    x, y, fill, value, content, dx,
  } = props;

  const { key } = content;
  const label = keyToLabel[key];

  return (
    <text
      x={x}
      y={y}
      dy={-10}
      dx={dx}
      fontSize="12"
      fontFamily="Open Sans"
      fill={fill}
      textAnchor="middle"
    >
      {label}
      {`: ${value}`}
    </text>
  );
};

CustomizedLabel.defaultProps = {
  x: 0,
  y: 0,
  fill: 'black',
  content: { key: '' },
  dx: 0,
  value: 0,
};

CustomizedLabel.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  fill: PropTypes.string,
  value: PropTypes.number,
  content: PropTypes.objectOf(PropTypes.any),
  dx: PropTypes.number,
};

export default CustomizedLabel;
