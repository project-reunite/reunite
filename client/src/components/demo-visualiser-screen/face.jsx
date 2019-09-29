import React from 'react';
import PropTypes from 'prop-types';
import FaceChart from '../face-chart';

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

  const faceChart = showGraphs ? (
    <div className="person-chart">
      <FaceChart data={generateDataForFaceChart(id)} size={faceSize} />
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
