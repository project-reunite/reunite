import React from 'react';
import './general-card.scss';
import Card, { CardImage, CardTitle } from 'mineral-ui/Card';

const GeneralCard = (props) => {
  const {
    title, img, onClick, dataCy,
  } = props;
  const cardStyle = { borderRadius: '20px' };
  return (
    <Card onClick={onClick} className="generalCard" data-cy={dataCy} style={cardStyle}>
      <CardTitle className="cardTitle">{title}</CardTitle>
      <CardImage
        className="cardImage"
        src={img}
        alt="gradient placeholder"
      />
    </Card>
  );
};

export default GeneralCard;
