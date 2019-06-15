import React from 'react';
import PropTypes from 'prop-types';
import './UIServiceCard.css';

import Card, { CardBlock, CardImage, CardTitle } from 'mineral-ui/Card';

const UIServiceCard = ({
  name, age, gender, img, onClick,
}) => {
  const cardStyle = { borderRadius: '20px' };
  const image = `/img/${img}`;

  return (
    <Card onClick={onClick} style={cardStyle}>
      <CardTitle>{name}</CardTitle>
      <div>
        <CardImage
          className="cardImage"
          src={image}
          alt="gradient placeholder"
        />
      </div>
      <CardBlock>{age}</CardBlock>
      <CardBlock>{gender}</CardBlock>
    </Card>
  );
};

export default UIServiceCard;

UIServiceCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
