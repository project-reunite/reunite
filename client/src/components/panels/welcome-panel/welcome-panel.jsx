import React from 'react';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardImage, CardTitle, CardBlock } from 'mineral-ui/Card';

import IconNext from 'mineral-ui-icons/IconPlayCircleOutline';
import Button from 'mineral-ui/Button';

import GeneralCard from '../../cards/general-card';

import Translate from '../../../locales/translate';

const { nextIconStyle } = require('../../../styles/icon-styles');
const { flexStyle } = require('../../../styles/flex-styles');
const { matchCardStyle } = require('../../../styles/card-styles');
const { nextButtonStyle } = require('../../../styles/button-styles');

const WelcomeCard = (props) => {
  const { moveOn } = props;
  const nextIcon = <IconNext style={nextIconStyle} />;

  return (
    <div className="cardContainer" data-cy="welcome-card">
      <Flex wrap {...flexStyle}>
        <FlexItem>
          <Card onClick={moveOn} className="generalCard" style={matchCardStyle}>
            <CardBlock>
              Imagine there are 64 missing people,and you need to find one of them.
            </CardBlock>
            <CardBlock>
              If you had to scroll through each photo one-by-one, you would find them after 32
              photos on average.
            </CardBlock>
            <CardImage className="cardImage" src="reunite-dark.svg" alt="gradient placeholder" />
            <CardBlock>
              Let&apos;s see how many photos it takes to find your person using our app!
            </CardBlock>
            <CardBlock>
              <Button style={nextButtonStyle} iconStart={nextIcon} onClick={moveOn}>
                Begin
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
};

WelcomeCard.propTypes = {
  moveOn: PropTypes.func,
};

export default WelcomeCard;
