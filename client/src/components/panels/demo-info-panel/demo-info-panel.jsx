import React from 'react';
import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, {
  CardImage, CardTitle, CardActions, CardBlock,
} from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';
import IconMoreInfo from 'mineral-ui-icons/IconPersonOutline';
import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';

import GithubIcon from '../../icons/github';

const { flexStyle } = require('../../../styles/flex-styles');
const { regularCardStyle, smallCardStyle } = require('../../../styles/card-styles');
const {
  secondButtonStyle,
  nextButtonStyle,
  buttonStyle,
} = require('../../../styles/button-styles');
const { iconStyle, nextIconStyle } = require('../../../styles/icon-styles');

const DemoInfoPanel = (props) => {
  const { moveOn } = props;

  const moreInfoIcon = <IconMoreInfo style={iconStyle} />;
  const nextIcon = <IconNext style={iconStyle} />;
  const githubIcon = <GithubIcon />;
  return (
    <div className="cardContainer" data-cy="welcome-card">
      <Flex wrap {...flexStyle}>
        <FlexItem data-cy="play-button">
          <Card onClick={moveOn} className="generalCard" style={regularCardStyle}>
            <CardBlock>
              Tap here to see the 64 people, and choose (in your head) who you are looking for.
            </CardBlock>
            <CardBlock>
              <a href="https://github.ibm.com/ProjectReunite/reunite">
                <Button style={buttonStyle} iconStart={moreInfoIcon} onClick={moveOn}>
                  Open Photos
                </Button>
              </a>
            </CardBlock>
            <CardBlock>
              To give feedback, drop us an email at project.reunited@gmail.com. Or if you find a
              bug, feel free to raise an issue on our github repo.
            </CardBlock>
            <CardBlock>
              <Button style={buttonStyle} iconStart={githubIcon} onClick={moveOn}>
                Github Repo
              </Button>
            </CardBlock>
            <CardBlock>
              This app has been made for use on any device, so give it a try on whichever you have
              access to and let us know what you think!
            </CardBlock>
            <CardBlock>When you are ready to try the app, hit start.</CardBlock>
            <CardBlock>
              <Button style={secondButtonStyle} iconStart={nextIcon} onClick={moveOn}>
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
