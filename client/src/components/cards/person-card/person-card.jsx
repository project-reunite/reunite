import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardFooter } from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import IconMoreInfo from 'mineral-ui-icons/IconPersonOutline';
import apiRequests from '../../../utils/apiRequests';

const {
  regularCardStyle,
  cardImageStyle,
  cardFooterStyle,
} = require('../../../styles/card-styles');

const { buttonStyle, secondButtonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

<<<<<<< HEAD
const PersonCard = (props) => {
  const [details, setDetails] = useState([]);

  const moreInfoIcon = <IconMoreInfo style={iconStyle} />;
  const successIcon = <IconSuccess style={iconStyle} />;
=======
const successIcon = <IconSuccess style={iconStyle} />;
const moreInfoIcon = <IconMoreInfo style={iconStyle} />;

const PersonCard = (props) => {
  const [details, setDetails] = useState([]);
>>>>>>> connect client to v2 api

  const {
    onError, id, onClick, onMatch,
  } = props;

  useEffect(() => {
<<<<<<< HEAD
    async function fetchData() {
      try {
        const personDetails = await apiRequests.getPerson(id);
        setDetails(personDetails);
=======
    let mounted = true;
    async function fetchData() {
      try {
        const personDetails = await apiRequests.getPerson(id);
        if (mounted) {
          setDetails(personDetails);
        }
>>>>>>> connect client to v2 api
      } catch (err) {
        onError();
      }
    }
    fetchData();
<<<<<<< HEAD
=======
    return () => {
      mounted = false;
    };
>>>>>>> connect client to v2 api
  }, [onError, id]);

  if (!details.data) {
    return null;
  }

  return (
    <div className="cardContainer">
      <Card style={regularCardStyle} className="personCard" data-cy="person-card">
        <CardImage
          style={cardImageStyle}
          className="cardImage"
          src={details.data.img_url}
          alt="gradient placeholder"
          onClick={onClick}
        />
        <CardFooter style={cardFooterStyle}>
          <Button
            style={secondButtonStyle}
            iconStart={successIcon}
            onClick={onMatch}
            data-cy="select-match"
          >
            My Person
          </Button>
          <Button
            style={buttonStyle}
            className="cardButton"
            iconStart={moreInfoIcon}
            onClick={onClick}
          >
            Similar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

PersonCard.defaultProps = {
  onClick: () => {},
  onMatch: () => {},
  onError: () => {},
};

PersonCard.propTypes = {
  onError: PropTypes.func,
  onClick: PropTypes.func,
  onMatch: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default PersonCard;
