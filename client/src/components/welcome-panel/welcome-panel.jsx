import React from 'react';
import './welcome-panel.scss';

const WelcomePanel = (props) => {
  const { startSearch, moreInfo } = props;
  return (
    <div data-cy="welcome-panel">
      <WelcomeButton onClick={startSearch} src="play.svg" className="playButton" dataCy="play-button" />
      <WelcomeButton onClick={moreInfo} src="question-mark.svg" className="infoButton" dataCy="info-button" />
    </div>
  );
};

const WelcomeButton = (props) => {
  const {
    onClick, src, className, dataCy,
  } = props;
  return (
    <div onClick={onClick} onKeyDown={onClick} tabIndex={0} role="button" data-cy={dataCy}>
      <img src={src} alt="" className={className} />
    </div>
  );
};

export default WelcomePanel;
