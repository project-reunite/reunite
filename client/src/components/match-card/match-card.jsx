import React from 'react';
import './match-card.scss';

export default function MatchCard() {
  return (
    <div data-cy="match-card">
      <Firework />
      <h1 className="matchFound"> MATCH! Please find an aid worker as soon as possible</h1>
    </div>
  );
}

const Firework = () => <img src="firework.svg" alt="" className="firework" />;
