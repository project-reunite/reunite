import React from 'react';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import GeneralCard from '../../cards/general-card';

import Translate from '../../../locales/translate';

const { flexStyle } = require('../../../styles/flex-styles');
const { smallCardStyle } = require('../../../styles/card-styles');

const WelcomeCard = (props) => {
  const { startSearch } = props;
  return (
    <div className="cardContainer" data-cy="welcome-card">
      <Flex wrap {...flexStyle}>
        <FlexItem data-cy="play-button">
          <GeneralCard
            onClick={startSearch}
            inputCardStyle={smallCardStyle}
            imageClassName="smallerCardImage"
            img="play.svg"
            title={<Translate string="welcome.start" />}
          />
        </FlexItem>
        <FlexItem className="startButton">
          <GeneralCard
            onClick={() => {}}
            imageClassName="smallerCardImage"
            inputCardStyle={smallCardStyle}
            img="question-mark.svg"
            title={<Translate string="welcome.info" />}
          />
        </FlexItem>
      </Flex>
    </div>
  );
};

WelcomeCard.defaultProps = {
  startSearch: () => {},
};

WelcomeCard.propTypes = {
  startSearch: PropTypes.func,
};

export default WelcomeCard;
