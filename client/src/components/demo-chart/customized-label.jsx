import React from 'react';

import Translate from '../../locales/translate';

const message1 = <Translate string="stats-summary-1" />;

const message2 = <Translate string="stats-summary-2" />;

const keyToLabel = {
  'Existing solution': message1,
  'Using Reunite': message2,
};

const CustomizedLabel = (props) => {
  const {
    x, y, fill, value, content, dx,
  } = props;
  console.log(props);
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
      {` (${value})`}
    </text>
  );
};

export default CustomizedLabel;
