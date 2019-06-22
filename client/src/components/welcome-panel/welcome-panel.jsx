import React from 'react';
import './welcome-panel.scss';

const MatchCard = (props) =>{
  const { startSearch, moreInfo } = props;
  return (
    <div data-cy="welcomePanel">
      <WelcomeButton onClick={startSearch} src='play.svg' className="playButton"/>
      <WelcomeButton onClick={moreInfo} src='question-mark.svg' className="infoButton"/>
    </div>
  );
}

const WelcomeButton = (props) => {
  const { onClick, src, className } = props;
  return (
  <img onClick={onClick} src={src} alt="" className={className} />
)}

export default MatchCard;
