import React from 'react';
import './welcome-panel.scss';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import GeneralCard from '../general-card';

const WelcomePanel = (props) => {
  const { startSearch } = props;
  return (
    <div className="welcomePanel" data-cy="welcome-panel">
      <Flex
        wrap
        justifyContent="evenly"
        alignItems="center"
      >
        <FlexItem data-cy="play-button">
          <GeneralCard onClick={startSearch} img="play.svg" title="Start" />
        </FlexItem>
        <FlexItem className="startButton">
          <GeneralCard onClick={startSearch} img="question-mark.svg" title="More Info" />
        </FlexItem>
      </Flex>
    </div>
  );
};

WelcomePanel.defaultProps = {
  startSearch: () => console.log('startSearch prop not found'),
};

WelcomePanel.propTypes = {
  startSearch: PropTypes.func,
};

export default WelcomePanel;
