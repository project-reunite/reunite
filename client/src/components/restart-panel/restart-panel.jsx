import React from 'react';
import PropTypes from 'prop-types';

import './restart-panel.scss';
import Button from 'mineral-ui/Button';
import Card, {
  CardBlock, CardTitle, CardActions,
} from 'mineral-ui/Card';

const buttonStyle = {
  color: 'white',
  backgroundColor: '#0062ff',
  backgroundColor_hover: '#054ada',
};

const cardStyle = {
  borderRadius: '20px',
  boxShadow: true,
};

const RestartPanel = (props) => {
  const { restart } = props;
  return (
    <div className="restartPanel">
      <Card style={cardStyle} data-cy="restart-card">
        <CardTitle className="cardTitle">No Match Found</CardTitle>
        <CardBlock fontSize="30px">
          No match was found, restart to try again
        </CardBlock>
        <CardActions>
          <Button Large fullWidth style={buttonStyle} onClick={restart}>Restart</Button>
        </CardActions>
      </Card>
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
