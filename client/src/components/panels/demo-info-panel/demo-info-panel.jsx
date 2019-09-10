import React from 'react';
import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardBlock } from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';

import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import IconMoreInfo from 'mineral-ui-icons/IconPersonOutline';
import config from '../../../config';
import Translate from '../../../locales/translate';

const { flexStyle } = require('../../../styles/flex-styles');
const { regularCardStyle } = require('../../../styles/card-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

const { origin } = config;

const DemoInfoPanel = (props) => {
  const { moveOn } = props;

  const moreInfoIcon = <IconMoreInfo style={iconStyle} />;
  const nextIcon = <IconNext style={iconStyle} />;
  const visualiseLink = `${origin}/visualise`;

  return (
    <div className="singleCardContainer" data-cy="demo-info-panel">
      <Flex wrap {...flexStyle}>
        <FlexItem data-cy="play-button">
          <Card className="generalCard" style={regularCardStyle}>
            <CardBlock>
              <p>
                <Translate string="demo-info.open-pictures" />
              </p>
            </CardBlock>
            <CardBlock>
              <a href={visualiseLink} target="_blank" rel="noopener noreferrer">
                <Button style={buttonStyle} iconStart={moreInfoIcon}>
                  <Translate string="button.open-photos" />
                </Button>
              </a>
            </CardBlock>
            <CardBlock>
              <p>
                <Translate string="demo-info.start-message" />
              </p>
            </CardBlock>
            <CardBlock>
              <Button style={buttonStyle} data-cy="start" iconStart={nextIcon} onClick={moveOn}>
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
