import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from 'mineral-ui/Button';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import IconCancel from 'mineral-ui-icons/IconCancel';
import Card, { CardImage, CardBlock, CardTitle } from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import apiRequests from '../../../utils/apiRequests';
import ConfirmMatchDialog from '../../dialogs/confirm-match-dialog';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

const MatchCard = (props) => {
  const [details, setDetails] = useState([]);
  const [isMatchConfirmed, setIsMatchConfirmed] = useState(false);

  const { onError, continueSearch, id } = props;

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

  const successMessage = `Yes, please reunite me with ${details.data.name}`;

  return (
    <div>
      <ConfirmMatchDialog
        isOpen={isMatchConfirmed}
        closeDialog={() => setIsMatchConfirmed(false)}
        message="Aid worker contacted!"
        title="Success"
      />
      <div className="cardContainer" data-cy="match-card">
        <FlexItem>
          <Card style={matchCardStyle} data-cy="person-card">
            <CardTitle className="cardTitle">Is this your relative?</CardTitle>
            <CardImage
              style={cardImageStyle}
              className="matchCardImage"
              src={details.data.img_url}
              alt="gradient placeholder"
            />
            <CardBlock style={cardBlockStyle}>
              {`${details.data.name}, ${details.data.age}`}
            </CardBlock>
            <CardBlock>
              <Button
                style={buttonStyle}
                iconStart={<IconSuccess style={iconStyle} />}
                primary
                onClick={() => setIsMatchConfirmed(true)}
              >
                {successMessage}
              </Button>
              <Button
                style={buttonStyle}
                onClick={continueSearch}
                iconStart={<IconCancel style={iconStyle} />}
              >
                No, keep searching
              </Button>
            </CardBlock>
          </Card>
        </FlexItem>
      </div>
    </div>
  );
};

MatchCard.defaultProps = {
  continueSearch: () => {},
  onError: () => {},
  id: '0',
};

MatchCard.propTypes = {
  onError: PropTypes.func,
  continueSearch: PropTypes.func,
  id: PropTypes.string,
};

export default MatchCard;
