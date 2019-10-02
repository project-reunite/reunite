import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Card, {
  CardImage, CardFooter,
} from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import IconMoreInfo from 'mineral-ui-icons/IconPersonOutline';
import apiRequests from '../../../utils/apiRequests';

import Translate from '../../../locales/translate';

const {
  regularCardStyle,
  cardImageStyle,
  cardFooterStyle,
} = require('../../../styles/card-styles');

const { responsivePrimaryButtonStyle, responsiveSecondButtonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

const successIcon = <IconSuccess style={iconStyle} />;
const moreInfoIcon = <IconMoreInfo style={iconStyle} />;

const PersonCard = (props) => {
  const [details, setDetails] = useState({});

  const {
    onError, id, onClick, onMatch, isMobile,
  } = props;

  const primaryButtonStyle = responsivePrimaryButtonStyle(isMobile);
  const secondButtonStyle = responsiveSecondButtonStyle(isMobile);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const personDetails = await apiRequests.getPerson(id);
        if (mounted) {
          setDetails(personDetails);
        }
      } catch (err) {
        onError();
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, [onError, id]);

  if (!details.data) {
    return null;
  }

  return (
    <Card style={regularCardStyle} className="personCard" data-cy="person-card">
      <CardImage
        style={cardImageStyle}
        className="cardImage"
        src={details.data.img_url}
        alt="gradient placeholder"
      />
      <p className="personName">
        #
        {details.data.name}
      </p>
      <CardFooter style={cardFooterStyle}>
        <Button
          style={secondButtonStyle}
          className="cardButton"
          iconStart={successIcon}
          onClick={() => onMatch(details.data)}
          data-cy="select-match"
        >
          <Translate string="person-card.my-person" />
        </Button>
        <Button
          style={primaryButtonStyle}
          className="cardButton"
          iconStart={moreInfoIcon}
          onClick={onClick}
        >
          <Translate string="person-card.similar" />
        </Button>
      </CardFooter>
    </Card>
  );
};

PersonCard.defaultProps = {
  onClick: () => {},
  onMatch: () => {},
  onError: () => {},
  isMobile: false,
};

PersonCard.propTypes = {
  onError: PropTypes.func,
  onClick: PropTypes.func,
  onMatch: PropTypes.func,
  isMobile: PropTypes.bool,
  id: PropTypes.string.isRequired,
};

export default PersonCard;
