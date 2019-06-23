import React from 'react';
import Card, { CardImage, CardTitle } from 'mineral-ui/Card';
import PropTypes from 'prop-types';

const SelectionCard = (props) => {
  const {
    setSelection, selection, urls, cyTag,
  } = props;
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

SelectionCard.defaultProps = {
  setSelection: () => console.log('setSelection prop not found'),
  selection: '',
  urls: [],
  cyTag: '',
};

SelectionCard.propTypes = {
  setSelection: PropTypes.func,
  selection: PropTypes.string,
  urls: PropTypes.arrayOf(PropTypes.string),
  cyTag: PropTypes.string,
};
