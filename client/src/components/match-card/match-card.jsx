import React from 'react';
import './match-card.scss';
import firework, {
  ReactComponent as Firework
} from "firework.svg";

export default function MatchCard() {
  return (
    <div data-cy="match-card">
      <Firework alt="" className="firework"/>
      <h1 className="matchFound"> MATCH! Please find an aid worker as soon as possible</h1>
    </div>
  );
}

// const Firework = () => <Firework src="firework.svg" alt="" className="firework" />;
