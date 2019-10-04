import React from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';

import Face from '../../faces/visualiser-face';
import { origin } from '../../../config';
import { AnimatedFaceDiv } from '../../animations/list-animations';

const SortedPersonsPanel = (props) => {
  const { personsSortedByName, showFaceCharts, isMobile } = props;
  return (
    <ul id="#menu">
      <PoseGroup>
        {personsSortedByName.map(person => (
          <AnimatedFaceDiv key={person.name}>
            <Face
              id={person._id}
              src={`${origin}${person.img_url}`}
              name={person.name}
              showFaceCharts={showFaceCharts}
              isMobile={isMobile}
            />
          </AnimatedFaceDiv>
        ))}
      </PoseGroup>
    </ul>
  );
};

SortedPersonsPanel.defaultProps = {
  isMobile: false,
};

SortedPersonsPanel.propTypes = {
  personsSortedByName: PropTypes.arrayOf(PropTypes.any).isRequired,
  showFaceCharts: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool,
};


export default SortedPersonsPanel;
