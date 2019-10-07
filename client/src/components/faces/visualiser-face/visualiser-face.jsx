import React from 'react';
import PropTypes from 'prop-types';
import FaceChart from '../../charts/face-chart';
import { AnimatedFaceChartDiv } from '../../animations/div-animations';
import { generateDataForFaceChart } from '../../../utils/util-functions';
import { origin } from '../../../config';

const VisualiserFace = (props) => {
  const {
    person, currentPersons, showFaceCharts, isMobile, position,
  } = props;

  const faceChartRadius = isMobile ? 50 : 100;

  let imgClass = 'face';

  if (currentPersons && currentPersons.includes(person._id)) { imgClass += ' selected'; }

  if (showFaceCharts) { imgClass += ' background-image'; }

  const faceChart = (
    <AnimatedFaceChartDiv className="person-chart" pose={showFaceCharts ? 'visible' : 'hidden'}>
      <FaceChart data={generateDataForFaceChart(person._id)} size={faceChartRadius} />
    </AnimatedFaceChartDiv>
  );

  const personSeenImage = person.personSeen
    ? <img className="person-seen-image" src="cross.svg" alt="Missing person" />
    : null;

  const personImageStyle = position
    ? { WebkitFilter: 'greyscale(100%)', filter: `grayscale(${100 * position / 128}%)` }
    : {};


  return (
    <div className="person-container">
      {personSeenImage}
      {faceChart}
      <img style={personImageStyle} className={imgClass} src={`${origin}${person.img_url}`} alt="Missing person" />
      {person.name}
    </div>
  );
};

VisualiserFace.defaultProps = {
  isMobile: false,
  currentPersons: [],
  position: 0,
};

VisualiserFace.propTypes = {
  isMobile: PropTypes.bool,
  person: PropTypes.objectOf(PropTypes.any).isRequired,
  currentPersons: PropTypes.arrayOf(PropTypes.string),
  showFaceCharts: PropTypes.bool.isRequired,
  position: PropTypes.number,
};

export default VisualiserFace;
