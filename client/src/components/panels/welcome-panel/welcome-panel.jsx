import React from 'react';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardImage, CardTitle, CardBlock } from 'mineral-ui/Card';

import GeneralCard from '../../cards/general-card';

import Translate from '../../../locales/translate';

const { flexStyle } = require('../../../styles/flex-styles');
const { smallCardStyle } = require('../../../styles/card-styles');

const WelcomeCard = (props) => {
  const { moveOn } = props;
  return (
    <div className="cardContainer" data-cy="welcome-card">
      <Flex wrap {...flexStyle}>
        {/* <FlexItem className="startButton">
          <GeneralCard
            onClick={() => {}}
            imageClassName="smallerCardImage"
            inputCardStyle={smallCardStyle}
            img="question-mark.svg"
            title={<Translate string="welcome.info" />}
          />
        </FlexItem> */}
        {/* <FlexItem data-cy="play-button">
          <GeneralCard
            onClick={moveOn}
            inputCardStyle={smallCardStyle}
            imageClassName="smallerCardImage"
            img="play.svg"
            title="When you are readt "
            title={<Translate string="welcome.start" />}
          />
        </FlexItem> */}
        <FlexItem data-cy="play-button">
          <Card onClick={moveOn} className="generalCard" style={smallCardStyle}>
            <CardBlock>
              Imagine there are 64 missing people,and you need to find one of them.
            </CardBlock>
            <CardBlock>
              If you had to scroll through each photo one-by-one, you would find them after 32
              photos on average.
            </CardBlock>
          </Card>
        </FlexItem>
        <FlexItem data-cy="play-button">
          <Card onClick={moveOn} className="generalCard" style={smallCardStyle}>
            <CardImage className="cardImage" src="start.svg" alt="gradient placeholder" />
            <CardBlock>
              Let's see how many photos it takes to find your person using our app!
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
