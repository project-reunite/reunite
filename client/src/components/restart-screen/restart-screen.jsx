import React from 'react';
import PropTypes from 'prop-types';

import './restart-screen.scss';
import Button from 'mineral-ui/Button';

const RestartScreen = (props) => {
  const { restart } = props;
  return (
    <div className="restartScreen">
      <h1 className="restartMessage"> No Match found, restart to try again </h1>
      <Button onClick={restart}>Restart</Button>
    </div>
  );
};

RestartScreen.defaultProps = {
  restart: () => console.log('restart prop not found'),

};

RestartScreen.propTypes = {
  restart: PropTypes.func,
};

export default RestartScreen;
