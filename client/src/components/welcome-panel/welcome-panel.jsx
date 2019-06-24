import React from 'react';
import './welcome-panel.scss';
import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardImage, CardTitle } from 'mineral-ui/Card';

const WelcomePanel = (props) => {
  const { startSearch } = props;
  return (
    <div className="welcomePanel" data-cy="welcome-panel">
      <Flex
        wrap
        justifyContent="evenly"
        alignItems="center"
      >
        <FlexItem className="startButton" data-cy="play-button">
          <Card onClick={startSearch} className="welcomeButton">
            <CardTitle className="cardTitle">Start</CardTitle>
            <CardImage
              className="cardImage"
              src="play.svg"
              alt="gradient placeholder"
            />
          </Card>
        </FlexItem>
        <FlexItem className="startButton">
          <Card onClick={startSearch} className="welcomeButton">
            <CardTitle className="cardTitle">More Info</CardTitle>
            <CardImage
              className="cardImage"
              src="question-mark.svg"
              alt="gradient placeholder"
            />
          </Card>
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
