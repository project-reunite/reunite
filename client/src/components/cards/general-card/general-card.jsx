import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardImage, CardTitle } from 'mineral-ui/Card';

const { regularCardStyle } = require('../../../styles/card-styles');

const GeneralCard = (props) => {
  const {
    title, img, onClick, dataCy, imageClassName, inputCardStyle,
  } = props;
  return (
    <Card onClick={onClick} className="generalCard" data-cy={dataCy} style={inputCardStyle}>
      <CardTitle className="cardTitle">{title}</CardTitle>
      <CardImage
        className={imageClassName || 'cardImage'}
        src={img}
        alt="gradient placeholder"
      />
    </Card>
  );
};

GeneralCard.defaultProps = {
  title: '',
  img: '',
  dataCy: '',
  imageClassName: '',
  inputCardStyle: regularCardStyle,
  onClick: () => {},
};

GeneralCard.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  dataCy: PropTypes.string,
  imageClassName: PropTypes.string,
  inputCardStyle: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func,
};

export default GeneralCard;
