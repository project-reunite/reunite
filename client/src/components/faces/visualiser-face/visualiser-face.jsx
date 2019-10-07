import React from 'react';
import PropTypes from 'prop-types';
import FaceChart from '../../charts/face-chart';
import { AnimatedFaceChartDiv } from '../../animations/div-animations';
import { generateDataForFaceChart } from '../../../utils/util-functions';
import { origin } from '../../../config';

const VisualiserFace = (props) => {
  const {
    person, currentPersons, showFaceCharts, isMobile, maximumProbability, minimumProbability,
  } = props;

  const faceChartRadius = isMobile ? 50 : 100;

  let imgClass = 'face';

  if (currentPersons && currentPersons.includes(person._id)) { imgClass += ' selected'; }

  if (person.personSeen) { imgClass += ' filtered'; }

  if (showFaceCharts) { imgClass += ' background-image'; }

  const faceChart = (
    <AnimatedFaceChartDiv className="person-chart" pose={showFaceCharts ? 'visible' : 'hidden'}>
      <FaceChart data={generateDataForFaceChart(person._id)} size={faceChartRadius} />
    </AnimatedFaceChartDiv>
  );

  let personImageStyle = {};
  if (maximumProbability && !person.personSeen) {
    personImageStyle = {
      // weight the image opacity so all images are seen
      opacity: 0.5 + (0.5 * (person.probability - minimumProbability) / (maximumProbability - minimumProbability)),
    };
  } else {
    personImageStyle = {};
  }

  return (
    <div className="person-container">
      {/* {personSeenImage} */}
      {faceChart}
      <img style={personImageStyle} className={imgClass} src={`${origin}${person.img_url}`} alt="Missing person" />
      {person.name}
    </div>
  );
};

VisualiserFace.defaultProps = {
  isMobile: false,
  currentPersons: [],
  maximumProbability: 1,
  minimumProbability: 0,
};

VisualiserFace.propTypes = {
  isMobile: PropTypes.bool,
  person: PropTypes.objectOf(PropTypes.any).isRequired,
  currentPersons: PropTypes.arrayOf(PropTypes.string),
  showFaceCharts: PropTypes.bool.isRequired,
  maximumProbability: PropTypes.number,
  minimumProbability: PropTypes.number,
};

export default VisualiserFace;
