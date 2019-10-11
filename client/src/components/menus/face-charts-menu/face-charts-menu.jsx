import React from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';

import { AnimatedUserButton } from '../../animations/list-animations';

const FaceChartMenu = (props) => {
  const {
    showCurrentEstimateChart,
    showFaceCharts,
    setShowCurrentEstimateChart,
    setShowFaceCharts,
  } = props;

  return (
    <ul className="menu">
      <PoseGroup>
        <AnimatedUserButton key="open-graphs">
          <button type="button" className="show-graphs-button" onClick={() => setShowCurrentEstimateChart(!showCurrentEstimateChart)}>
            {showCurrentEstimateChart ? 'Hide Current Estimate' : 'Show Current Estimate'}
          </button>
        </AnimatedUserButton>
      </PoseGroup>
      <PoseGroup>
        <AnimatedUserButton key="open-graphs">
          <button type="button" className="show-graphs-button" onClick={() => setShowFaceCharts(!showFaceCharts)}>
            {showFaceCharts ? 'Hide Image Analysis' : 'Show Image Analysis'}
          </button>
        </AnimatedUserButton>
      </PoseGroup>
    </ul>
  );
};

FaceChartMenu.defaultProps = {
  showCurrentEstimateChart: false,
  showFaceCharts: false,
  setShowCurrentEstimateChart: () => {},
  setShowFaceCharts: () => {},
};

FaceChartMenu.propTypes = {
  showCurrentEstimateChart: PropTypes.bool,
  showFaceCharts: PropTypes.bool,
  setShowCurrentEstimateChart: PropTypes.func,
  setShowFaceCharts: PropTypes.func,
};

export default FaceChartMenu;
