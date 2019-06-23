import React from 'react';
import './welcome-panel.scss';
import PropTypes from 'prop-types';
import Grid, { GridItem } from 'mineral-ui/Grid';

const WelcomePanel = (props) => {
  const { startSearch, moreInfo } = props;
  return (
    <div className="welcomePanel" data-cy="welcome-panel">
      <Grid>
        <GridItem>
          <WelcomeButton onClick={startSearch} src="play.svg" className="playButton" dataCy="play-button" />
          <h1> Start </h1>
        </GridItem>
        <GridItem>
          <WelcomeButton onClick={moreInfo} src="question-mark.svg" className="infoButton" dataCy="info-button" />
          <h1> More Info </h1>
        </GridItem>
      </Grid>
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

WelcomePanel.defaultProps = {
  startSearch: () => console.log('startSearch prop not found'),
  moreInfo: () => console.log('moreInfo prop not found'),
};

WelcomePanel.propTypes = {
  startSearch: PropTypes.func,
  moreInfo: PropTypes.func,
};

WelcomeButton.defaultProps = {
  onClick: () => console.log('restart prop not found'),
  src: '',
  className: '',
  dataCy: '',
};

WelcomeButton.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string,
  className: PropTypes.string,
  dataCy: PropTypes.string,
};

export default WelcomePanel;
