import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

import './visualiser-control-panel.scss';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';

const { Handle } = Slider;

const handle = (props) => {
  const {
    value, dragging, index, ...restProps
  } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export default handle;
