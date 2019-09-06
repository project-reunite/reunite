import React from 'react';
import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardImage, CardTitle, CardBlock } from 'mineral-ui/Card';

const { flexStyle } = require('../../../styles/flex-styles');
const { smallCardStyle } = require('../../../styles/card-styles');

const DemoInfoPanel = (props) => {
  const { moveOn } = props;
  return (
    <div className="cardContainer" data-cy="welcome-card">
      <Flex wrap {...flexStyle}>
        <FlexItem data-cy="play-button">
          <Card onClick={moveOn} className="generalCard" style={smallCardStyle}>
            <CardBlock>
              Tap here to see the 64 people, and choose (in your head) who you are looking for.
            </CardBlock>
          </Card>
        </FlexItem>
      </Flex>
      <Flex wrap {...flexStyle}>
        <FlexItem data-cy="play-button">
          <Card onClick={moveOn} className="generalCard" style={smallCardStyle}>
            <CardImage className="cardImage" src="start.svg" alt="gradient placeholder" />
            <CardBlock>When you are ready, hit start</CardBlock>
          </Card>
        </FlexItem>
      </Flex>
    </div>
  );
};

DemoInfoPanel.defaultProps = {
  moveOn: () => {},
};

DemoInfoPanel.propTypes = {
  moveOn: PropTypes.func,
};

export default DemoInfoPanel;
