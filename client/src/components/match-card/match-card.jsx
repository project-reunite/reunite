import React from 'react';
import PropTypes from 'prop-types';
import Button from 'mineral-ui/Button';
import IconRestart from 'mineral-ui-icons/IconRefresh';
import Card, {
  CardImage, CardBlock, CardTitle,
} from 'mineral-ui/Card';


const { cardStyle, cardImageStyle } = require('../../styles/card-styles');

const MatchCard = (props) => {
  const { restart } = props;
  const icon = <IconRestart />;
  return (
    <div className="cardContainer" data-cy="match-card">
      <Card style={cardStyle} data-cy="person-card">
        <CardTitle className="cardTitle">Match Found!</CardTitle>
        <CardImage
          style={cardImageStyle}
          className="cardImage"
          src="firework.svg"
          alt="gradient placeholder"
        />
        <CardBlock>
          <Button iconStart={icon} primary onClick={restart}>Restart</Button>
        </CardBlock>
      </Card>
    </div>
  );
};

MatchCard.defaultProps = {
  restart: () => console.log('restart prop not found'),
};

MatchCard.propTypes = {
  restart: PropTypes.func,
};


export default MatchCard;
