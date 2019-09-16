import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'mineral-ui/Button';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import IconCancel from 'mineral-ui-icons/IconCancel';
import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import ConfirmMatchDialog from '../../dialogs/confirm-match-dialog';

import Translate from '../../../locales/translate';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { buttonStyle, secondButtonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

const MatchCard = (props) => {
  const [isMatchConfirmed, setIsMatchConfirmed] = useState(false);
  const { continueSearch, confirmMatch, foundPersonDetails } = props;
  const successMessage = <Translate string="match-card.match-accept" />;

  return (
    <div>
      <ConfirmMatchDialog
        isOpen={isMatchConfirmed}
        closeDialog={() => setIsMatchConfirmed(false)}
        confirmMatch={confirmMatch}
      />
      <div className="singleCardContainer" data-cy="match-card">
        <FlexItem>
          <Card style={matchCardStyle} data-cy="person-card">
            <CardTitle className="cardTitle">
              <Translate string="match-card.title" />
            </CardTitle>
            <CardImage
              style={cardImageStyle}
              className="cardImage"
              src={foundPersonDetails.img_url}
              details={foundPersonDetails}
              alt="gradient placeholder"
            />
            <CardBlock style={cardBlockStyle}>
              {`${foundPersonDetails.name}, ${foundPersonDetails.age}`}
            </CardBlock>
            <CardBlock>
              <Button
                style={buttonStyle}
                iconStart={<IconSuccess style={iconStyle} />}
                primary
                onClick={() => {
                  setIsMatchConfirmed(true);
                }}
              >
                {successMessage}
              </Button>
              <Button
                style={secondButtonStyle}
                onClick={continueSearch}
                iconStart={<IconCancel style={iconStyle} />}
              >
                <Translate string="match-card.match-reject" />
              </Button>
            </CardBlock>
          </Card>
        </FlexItem>
      </div>
    </div>
  );
};

MatchCard.defaultProps = {
  confirmMatch: () => {},
  continueSearch: () => {},
  foundPersonDetails: {
    name: '',
    age: '',
    img_url: '',
  },
};

MatchCard.propTypes = {
  confirmMatch: PropTypes.func,
  continueSearch: PropTypes.func,
  foundPersonDetails: PropTypes.objectOf(PropTypes.string),
};

export default MatchCard;
