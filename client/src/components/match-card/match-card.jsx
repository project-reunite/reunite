import React from 'react';
import PropTypes from 'prop-types';
import Button from 'mineral-ui/Button';
import Card, {
  CardImage, CardBlock, CardTitle,
} from 'mineral-ui/Card';

const cardStyle = {
  borderRadius: '20px',
  boxShadow: true,
};

const buttonStyle = {
  color: 'white',
  backgroundColor: '#0062ff',
};

const MatchCard = (props) => {
  const { restart } = props;
  return (
    <div className="cardContainer" data-cy="match-card">
      <Card style={cardStyle} data-cy="person-card">
        <CardTitle className="cardTitle">Match Found!</CardTitle>
        <CardImage
          className="cardImage"
          src="firework.svg"
          alt="gradient placeholder"
        />
        <CardBlock>
          <Button fullWidth style={buttonStyle} onClick={restart}>Restart</Button>
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
