import React from 'react';
import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, {
  CardImage, CardTitle, CardActions, CardBlock,
} from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';

import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import IconMoreInfo from 'mineral-ui-icons/IconPersonOutline';
import Translate from '../../../locales/translate';
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
              <p>
                <Translate string="demo-info.open-pictures" />
              </p>
            </CardBlock>
            <CardBlock>
              <a href="https://github.ibm.com/ProjectReunite/reunite">
                <Button style={buttonStyle} iconStart={moreInfoIcon} onClick={moveOn}>
                  <Translate string="button.open-photos" />
                </Button>
              </a>
            </CardBlock>
            <CardBlock>
              <p>
                <Translate string="demo-info.feedback" />
              </p>
              <p>
                <Translate string="demo-info.raise-issue" />
              </p>
            </CardBlock>
            <CardBlock>
              <Button style={buttonStyle} iconStart={githubIcon} onClick={moveOn}>
                <Translate string="button.github-repo" />
              </Button>
            </CardBlock>
            <CardBlock>
              <p>
                <Translate string="demo-info.start-message" />
              </p>
            </CardBlock>
            <CardBlock>
              <Button style={buttonStyle} iconStart={nextIcon} onClick={moveOn}>
                <Translate string="button.start" />
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
