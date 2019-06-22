import React from 'react';
import Card, { CardImage, CardTitle } from 'mineral-ui/Card';

const SelectionCard = (props) => {
  const { setSelection, selection, urls, cyTag } = props;
  const icon = urls[selection];
  const cardStyle = { borderRadius: '20px' };
  return (
    <Card
      onClick={() => setSelection(selection)}
      style={cardStyle}
      data-cy={cyTag}
    >
      <CardTitle>{selection}</CardTitle>
      <div>
        <CardImage
          className="cardImage"
          src={icon}
          alt="gradient placeholder"
        />
      </div>
    </Card>
);
};

export default SelectionCard;
