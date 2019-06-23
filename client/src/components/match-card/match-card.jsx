import React from 'react';
import PropTypes from 'prop-types';
import './match-card.scss';

import Button from 'mineral-ui/Button';

const buttonStyle = {
  color: 'white',
  backgroundColor: '#0062ff',
  backgroundColor_hover: '#054ada',
};

const MatchCard = (props) => {
  const { restart } = props;
  return (
    <div className="matchCard" data-cy="match-card">
      <Firework />
      <h1 className="matchFound"> MATCH! Please find an aid worker as soon as possible</h1>
      <Button style={buttonStyle} onClick={restart}>Restart</Button>
    </div>
  );
};

const Firework = () => <img src="firework.svg" alt="" className="firework" />;

MatchCard.defaultProps = {
  restart: () => console.log('restart prop not found'),
};

MatchCard.propTypes = {
  restart: PropTypes.func,
};


export default MatchCard;
