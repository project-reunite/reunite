import React from 'react';
import PropTypes from 'prop-types';

import './restart-panel.scss';
import Button from 'mineral-ui/Button';

const buttonStyle = {
  color: 'white',
  backgroundColor: '#0062ff',
  backgroundColor_hover: '#054ada',
};

const RestartPanel = (props) => {
  const { restart } = props;
  return (
    <div className="restartPanel">
      <h1 className="restartMessage"> No Match found, restart to try again </h1>
      <Button style={buttonStyle} onClick={restart}>Restart</Button>
    </div>
  );
};

RestartPanel.defaultProps = {
  restart: () => console.log('restart prop not found'),
};

RestartPanel.propTypes = {
  restart: PropTypes.func,
};

export default RestartPanel;
