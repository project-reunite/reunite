import React from 'react';
import PropTypes from 'prop-types';

import IconRestart from 'mineral-ui-icons/IconRefresh';
import Button from 'mineral-ui/Button';
import Card, {
  CardBlock, CardTitle, CardActions,
} from 'mineral-ui/Card';

const { regularCardStyle } = require('../../styles/card-styles');

const RestartCard = (props) => {
  const { restart } = props;
  const icon = <IconRestart />;
  return (
    <div className="cardContainer">
      <Card style={regularCardStyle} data-cy="restart-card">
        <CardTitle className="cardTitle">No Match Found</CardTitle>
        <CardBlock fontSize="30px">
          No match was found, restart to try again
        </CardBlock>
        <CardActions>
          <Button primary iconStart={icon} onClick={restart}>Restart</Button>
        </CardActions>
      </Card>
    </div>
  );
};

RestartCard.defaultProps = {
  restart: () => console.log('restart prop not found'),
};

RestartCard.propTypes = {
  restart: PropTypes.func,
};

export default RestartCard;
