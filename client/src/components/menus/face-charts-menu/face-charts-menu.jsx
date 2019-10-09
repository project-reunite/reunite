import React from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';
import Slider from '../../slider';


import { AnimatedUserButton } from '../../animations/list-animations';

const FaceChartMenu = (props) => {
  const {
    showCurrentEstimateChart,
    showFaceCharts,
    setShowCurrentEstimateChart,
    setShowFaceCharts,
    showProbabilities,
    setShowProbabilities,
    setMinFaceOpacity,
  } = props;

  return (
    <ul className="menu">
      <PoseGroup>
        <AnimatedUserButton key="open-graphs">
          <button type="button" className="show-graphs-button" onClick={() => setShowCurrentEstimateChart(!showCurrentEstimateChart)}>
            {showCurrentEstimateChart ? 'Hide Current Estimate' : 'Show Current Estimate'}
          </button>
        </AnimatedUserButton>
        <AnimatedUserButton key="open-graphs">
          <button type="button" className="show-graphs-button" onClick={() => setShowFaceCharts(!showFaceCharts)}>
            {showFaceCharts ? 'Hide Image Analysis' : 'Show Image Analysis'}
          </button>
        </AnimatedUserButton>
        <AnimatedUserButton key="open-graphs">
          <button type="button" className="show-graphs-button" onClick={() => setShowProbabilities(!showProbabilities)}>
            {showProbabilities ? 'Show Gradients' : 'Show Probabilities'}
          </button>
        </AnimatedUserButton>
      </PoseGroup>
    </ul>
  );
};

FaceChartMenu.defaultProps = {
  showCurrentEstimateChart: false,
  showFaceCharts: false,
  showProbabilities: false,
  setShowCurrentEstimateChart: () => {},
  setShowFaceCharts: () => {},
  setShowProbabilities: () => {},
  setMinFaceOpacity: () => {},
};

FaceChartMenu.propTypes = {
  showCurrentEstimateChart: PropTypes.bool,
  showFaceCharts: PropTypes.bool,
  showProbabilities: PropTypes.bool,
  setShowCurrentEstimateChart: PropTypes.func,
  setShowFaceCharts: PropTypes.func,
  setShowProbabilities: PropTypes.func,
  setMinFaceOpacity: PropTypes.func,
};

export default FaceChartMenu;
