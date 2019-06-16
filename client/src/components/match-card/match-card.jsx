import React from 'react';

const divStyle = {
  color: 'black',
  fontSize: '40px',
};

export default function MatchCard() {
  return (
    <div style={divStyle} data-cy="match-card">
      <Firework />
      <h1> MATCH! Please find an aid worker as soon as possible</h1>
    </div>
  );
}

const Firework = () => <img src="firework.jpg" alt="" />;
