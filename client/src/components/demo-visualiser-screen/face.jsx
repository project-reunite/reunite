import React from 'react';
import PropTypes from 'prop-types';
import FaceChart from '../face-chart';
import { PosedFaceChart } from '../animations/div-animations';

const generateDataForFaceChart = name => [...name].map(char => (
  { A: (Number(char)) }));

const Face = (props) => {
  const {
    src, name, personSeen, id, currentPersons, showGraphs, isMobile,
  } = props;

  const faceSize = isMobile ? 100 : 150;

  let imgClass = 'face';

  if (personSeen) {
    imgClass += ' filtered';
  }
  if (currentPersons && currentPersons.includes(id)) {
    imgClass += ' selected';
  }
  if (showGraphs) {
    imgClass += ' background-image';
  }

  const faceChart = (
    <PosedFaceChart className="person-chart" pose={showGraphs ? 'visible' : 'hidden'}>
      <FaceChart data={generateDataForFaceChart(id)} size={faceSize} />
    </PosedFaceChart>
  );

  return (
    <div className="person-container">
      {faceChart}
      <img className={imgClass} src={src} alt="Missing person" />
      {name}
    </div>
  );
};

Face.defaultProps = {
  personSeen: false,
  currentPersons: [],
};

Face.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.number.isRequired,
  personSeen: PropTypes.bool,
  id: PropTypes.string.isRequired,
  currentPersons: PropTypes.arrayOf(PropTypes.string),
  showGraphs: PropTypes.bool.isRequired,
};

export default Face;
