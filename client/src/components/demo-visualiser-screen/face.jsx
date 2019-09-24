import React from 'react';
import PropTypes from 'prop-types';
import FaceChart from '../face-chart';

const generateDataForFaceChart = (name) => {
  const faceData = [];
  [...name].forEach(c => faceData.push({
    A: (Number(c) === 1) ? 1 : 0.5,
  }));
  return faceData;
};

const Face = (props) => {
  const {
    src, name, personSeen, id, currentPersons, showGraphs,
  } = props;

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

  const faceChart = showGraphs ? (
    <div className="person-chart">
      <FaceChart data={generateDataForFaceChart(id)} />
    </div>
  )
    : null;

  return (
    <div className="person-container">
      {faceChart}
      <img className={imgClass} src={src} alt="Missing person" />
      {name}
    </div>
  );
};

Face.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.number.isRequired,
  personSeen: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  currentPersons: PropTypes.arrayOf(PropTypes.string).isRequired,
  showGraphs: PropTypes.bool.isRequired,
};

export default Face;
