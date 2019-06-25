import React from 'react';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import GeneralCard from '../general-card';

const { flexStyle } = require('../../styles/flex-styles');

const WelcomeCard = (props) => {
  const { startSearch } = props;
  return (
    <div className="cardContainer" data-cy="welcome-card">
      <Flex
        wrap
        {...flexStyle}
      >
        <FlexItem data-cy="play-button">
          <GeneralCard onClick={startSearch} img="play.svg" title="Start" />
        </FlexItem>
        <FlexItem className="startButton">
          <GeneralCard onClick img="question-mark.svg" title="More Info" />
        </FlexItem>
      </Flex>
    </div>
  );
};

WelcomeCard.defaultProps = {
  startSearch: () => console.log('startSearch prop not found'),
};

WelcomeCard.propTypes = {
  startSearch: PropTypes.func,
};

export default WelcomeCard;
