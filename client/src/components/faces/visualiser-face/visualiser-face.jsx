import React from 'react';
import PropTypes from 'prop-types';
import FaceChart from '../../charts/face-chart';
import { AnimatedFaceChartDiv } from '../../animations/div-animations';
import { generateDataForFaceChart } from '../../../utils/util-functions';
import { origin } from '../../../config';

const VisualiserFace = (props) => {
  const {
    person, currentPersons, showFaceCharts, isMobile,
  } = props;

  const faceChartRadius = isMobile ? 50 : 100;

  let imgClass = 'face';

  if (person.personSeen) { imgClass += ' filtered'; }

  if (currentPersons && currentPersons.includes(person._id)) { imgClass += ' selected'; }

  if (showFaceCharts) { imgClass += ' background-image'; }

  const faceChart = (
    <AnimatedFaceChartDiv className="person-chart" pose={showFaceCharts ? 'visible' : 'hidden'}>
      <FaceChart data={generateDataForFaceChart(person._id)} size={faceChartRadius} />
    </AnimatedFaceChartDiv>
  );

  return (
    <div className="person-container">
      {faceChart}
      <img className={imgClass} src={`${origin}${person.img_url}`} alt="Missing person" />
      {person.name}
    </div>
  );
};

VisualiserFace.defaultProps = {
  isMobile: false,
  currentPersons: [],
};

VisualiserFace.propTypes = {
  isMobile: PropTypes.bool,
  person: PropTypes.objectOf(PropTypes.any).isRequired,
  currentPersons: PropTypes.arrayOf(PropTypes.string),
  showFaceCharts: PropTypes.bool.isRequired,
};

export default VisualiserFace;
