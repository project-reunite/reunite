import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from 'mineral-ui/Button';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import IconCancel from 'mineral-ui-icons/IconCancel';
import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import apiRequests from '../../../utils/apiRequests';
import ConfirmMatchDialog from '../../dialogs/confirm-match-dialog';

import Translate from '../../../locales/translate';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

const MatchCard = (props) => {
  const [details, setDetails] = useState([]);
  const [isMatchConfirmed, setIsMatchConfirmed] = useState(false);

  const {
    onError, continueSearch, restartApp, id, confirmMatch,
  } = props;

  useEffect(() => {
    async function fetchData() {
      try {
        const personDetails = await apiRequests.getPerson(id);
        setDetails(personDetails);
      } catch (err) {
        onError();
      }
    }
    fetchData();
  }, [onError, id]);

  if (!details.data) {
    return null;
  }

  const successMessage = <Translate string="match-card.match-accept" />;

  return (
    <div>
      <ConfirmMatchDialog
        isOpen={isMatchConfirmed}
        closeDialog={() => setIsMatchConfirmed(false)}
        restartApp={restartApp}
        message="Aid worker contacted!"
        title="Success"
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
              src={details.data.img_url}
              alt="gradient placeholder"
            />
            <CardBlock style={cardBlockStyle}>
              {details.data.name}
            </CardBlock>
            <CardBlock>
              <Button
                style={buttonStyle}
                iconStart={<IconSuccess style={iconStyle} />}
                primary
                onClick={() => {
                  confirmMatch(details);
                }}
              >
                {successMessage}
              </Button>
              <Button
                style={buttonStyle}
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
  restartApp: () => {},
  continueSearch: () => {},
  onError: () => {},
  id: '0',
};

MatchCard.propTypes = {
  confirmMatch: PropTypes.func,
  onError: PropTypes.func,
  restartApp: PropTypes.func,
  continueSearch: PropTypes.func,
  id: PropTypes.string,
};

export default MatchCard;
