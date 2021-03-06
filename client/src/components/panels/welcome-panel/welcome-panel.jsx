import React from 'react';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardImage, CardBlock } from 'mineral-ui/Card';

import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Button from 'mineral-ui/Button';

import Translate from '../../../locales/translate';

const { iconStyle } = require('../../../styles/icon-styles');
const { flexStyle } = require('../../../styles/flex-styles');
const { regularCardStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { responsivePrimaryButtonStyle } = require('../../../styles/button-styles');

const WelcomeCard = (props) => {
  const { moveOn, isMobile } = props;
  const nextIcon = <IconNext style={iconStyle} />;

  const buttonStyle = responsivePrimaryButtonStyle(isMobile);

  return (
    <div className="singleCardContainer" data-cy="welcome-card">
      <Flex wrap {...flexStyle}>
        <FlexItem>
          <Card className="generalCard" style={regularCardStyle}>
            <CardImage className="logoImage" src="reunite-dark.svg" alt="gradient placeholder" />
            <CardBlock style={cardBlockStyle}>
              <p>
                <Translate string="welcomePanel.message-1" />
              </p>
            </CardBlock>
            <CardBlock style={cardBlockStyle}>
              <p>
                <Translate string="welcomePanel.message-2" />
              </p>
            </CardBlock>
            <CardBlock>
              <p>
                <Translate string="welcomePanel.message-3" />
              </p>
            </CardBlock>
            <CardBlock>
              <p>
                <Translate string="welcomePanel.message-4" />
              </p>
            </CardBlock>
            <CardBlock style={cardBlockStyle}>
              <Button style={buttonStyle} data-cy="begin" iconStart={nextIcon} onClick={moveOn}>
                <Translate string="button.begin" />
              </Button>
            </CardBlock>
          </Card>
        </FlexItem>
      </Flex>
    </div>
  );
};

WelcomeCard.defaultProps = {
  moveOn: () => {},
  isMobile: false,
};

WelcomeCard.propTypes = {
  moveOn: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default WelcomeCard;
