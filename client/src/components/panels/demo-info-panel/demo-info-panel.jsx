import React from 'react';
import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, {
  CardImage, CardTitle, CardActions, CardBlock,
} from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';
import IconMoreInfo from 'mineral-ui-icons/IconPersonOutline';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';

const { flexStyle } = require('../../../styles/flex-styles');
const { smallCardStyle } = require('../../../styles/card-styles');
const { nextButtonStyle, secondButtonStyle } = require('../../../styles/button-styles');
const { iconStyle, nextIconStyle } = require('../../../styles/icon-styles');

const DemoInfoPanel = (props) => {
  const { moveOn } = props;

  const moreInfoIcon = <IconMoreInfo style={iconStyle} />;
  const nextIcon = <IconNext style={nextIconStyle} />;
  return (
    <div className="cardContainer" data-cy="welcome-card">
      <Flex wrap {...flexStyle}>
        <FlexItem data-cy="play-button">
          <Card onClick={moveOn} className="generalCard" style={smallCardStyle}>
            <CardBlock>
              Tap here to see the 64 people, and choose (in your head) who you are looking for.
            </CardBlock>
            <CardBlock>
              <Button style={secondButtonStyle} fullWidth iconStart={moreInfoIcon} onClick={moveOn}>
                Open Photos
              </Button>
            </CardBlock>
          </Card>
        </FlexItem>
      </Flex>
      <Flex wrap {...flexStyle}>
        <FlexItem data-cy="play-button">
          <Card className="generalCard" style={smallCardStyle}>
            <CardBlock>When you are ready, hit start</CardBlock>
            <CardBlock>
              <Button style={nextButtonStyle} fullWidth iconStart={nextIcon} onClick={moveOn}>
                Start
              </Button>
            </CardBlock>
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
