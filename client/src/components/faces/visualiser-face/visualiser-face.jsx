import React from 'react';
import PropTypes from 'prop-types';
import FaceChart from '../../charts/face-chart';
import { AnimatedFaceChartDiv } from '../../animations/div-animations';
import { generateDataForFaceChart } from '../../../utils/util-functions';
import chartSizes from '../../../utils/chart-sizes';
import { origin } from '../../../config';

const VisualiserFace = (props) => {
  const {
    person,
    currentPersons,
    showFaceCharts,
    isMobile,
    maximumProbability,
    minimumProbability,
    showProbability,
    minFaceOpacity,
  } = props;

  const faceChartRadius = isMobile ? chartSizes.faceChartRadiusMobile : chartSizes.faceChartRadius;

  let imgClass = 'face';

  if (currentPersons && currentPersons.includes(person._id)) {
    imgClass += ' selected';
  }

  if (person.personSeen) {
    imgClass += ' filtered';
  }

  if (showFaceCharts) {
    imgClass += ' background-image';
  }

  const faceChart = (
    <AnimatedFaceChartDiv className="person-chart" pose={showFaceCharts ? 'visible' : 'hidden'}>
      <FaceChart data={generateDataForFaceChart(person._id)} size={faceChartRadius} />
    </AnimatedFaceChartDiv>
  );

  let personImageStyle = {};

  if (!person.personSeen && minimumProbability !== maximumProbability) {
    personImageStyle = showProbability
      ? {
        opacity:
            minFaceOpacity
            + ((1 - minFaceOpacity) * (person.probability - minimumProbability))
              / (maximumProbability - minimumProbability),
      }
      : {
        // opacity: minFaceOpacity + (128 - position) / 128,
      };
  }

  return (
    <div className="person-container">
      {faceChart}
      <img
        style={personImageStyle}
        className={imgClass}
        src={`${origin}${person.img_url}`}
        alt="Missing person"
      />
      #
      {person.name}
    </div>
  );
};

VisualiserFace.defaultProps = {
  isMobile: false,
  currentPersons: [],
  maximumProbability: 1,
  minimumProbability: 0,
  showProbability: false,
  minFaceOpacity: 0,
  position: 0,
};

VisualiserFace.propTypes = {
  isMobile: PropTypes.bool,
  person: PropTypes.objectOf(PropTypes.any).isRequired,
  currentPersons: PropTypes.arrayOf(PropTypes.string),
  showFaceCharts: PropTypes.bool.isRequired,
  maximumProbability: PropTypes.number,
  minimumProbability: PropTypes.number,
  minFaceOpacity: PropTypes.number,
  position: PropTypes.number,
  showProbability: PropTypes.bool,
};

export default VisualiserFace;
