import React from 'react';
import PropTypes from 'prop-types';

import { PoseGroup } from 'react-pose';
import { origin } from '../../../config';

import Face from '../../faces/visualiser-face';
import { AnimatedFaceDiv } from '../../animations/list-animations';

const RankedPersonsPanel = (props) => {
  const {
    rankedPersons, showFaceCharts, isMobile, currentPersons,
  } = props;
  return (
    <ul id="#menu">
      <PoseGroup>
        {rankedPersons.map(person => (
          <AnimatedFaceDiv key={person.name}>
            <Face
              id={person._id}
              src={`${origin}${person.img_url}`}
              name={person.name}
              personSeen={person.personSeen}
              currentPersons={currentPersons}
              showFaceCharts={showFaceCharts}
              isMobile={isMobile}
            />
          </AnimatedFaceDiv>
        ))}
      </PoseGroup>
    </ul>
  );
};

RankedPersonsPanel.defaultProps = {
  isMobile: false,
};

RankedPersonsPanel.propTypes = {
  rankedPersons: PropTypes.arrayOf(PropTypes.any).isRequired,
  showFaceCharts: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  currentPersons: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default RankedPersonsPanel;
