import React from 'react';
import './general-card.scss';
import Card, { CardImage, CardTitle } from 'mineral-ui/Card';

const GeneralCard = (props) => {
  const { title, img, onClick } = props;
  const cardStyle = { borderRadius: '20px' };
  return (
    <Card onClick={onClick} className="generalCard" style={cardStyle}>
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
