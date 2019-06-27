import React from 'react';
import Card, { CardImage, CardTitle } from 'mineral-ui/Card';

const { regularCardStyle } = require('../../styles/card-styles');

const GeneralCard = (props) => {
  const {
    title, img, onClick, dataCy, imageClassName, inputCardStyle,
  } = props;
  return (
    <Card onClick={onClick} className="generalCard" data-cy={dataCy} style={inputCardStyle || regularCardStyle}>
      <CardTitle className="cardTitle">{title}</CardTitle>
      <CardImage
        className={imageClassName || 'cardImage'}
        src={img}
        alt="gradient placeholder"
      />
    </Card>
  );
};

export default GeneralCard;
