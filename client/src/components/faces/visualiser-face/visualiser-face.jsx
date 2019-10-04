import React from 'react';
import PropTypes from 'prop-types';
import FaceChart from '../../charts/face-chart';
import { AnimatedFaceChartDiv } from '../../animations/div-animations';
import { generateDataForFaceChart } from '../../../utils/util-functions';

const VisualiserFace = (props) => {
  const {
    src, name, personSeen, id, currentPersons, showFaceCharts, isMobile,
  } = props;

  const faceSize = isMobile ? 100 : 200;

  let imgClass = 'face';

  if (personSeen) { imgClass += ' filtered'; }

  if (currentPersons && currentPersons.includes(id)) { imgClass += ' selected'; }

  if (showFaceCharts) { imgClass += ' background-image'; }

  const faceChart = (
    <AnimatedFaceChartDiv className="person-chart" pose={showFaceCharts ? 'visible' : 'hidden'}>
      <FaceChart data={generateDataForFaceChart(id)} size={faceSize} />
    </AnimatedFaceChartDiv>
  );

  return (
    <div className="person-container">
      {faceChart}
      <img className={imgClass} src={src} alt="Missing person" />
      {name}
    </div>
  );
};

VisualiserFace.defaultProps = {
  personSeen: false,
  isMobile: false,
  currentPersons: [],
};

VisualiserFace.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.number.isRequired,
  personSeen: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  currentPersons: PropTypes.arrayOf(PropTypes.string),
  showFaceCharts: PropTypes.bool.isRequired,
};

export default VisualiserFace;
