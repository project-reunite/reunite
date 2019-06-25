import React from 'react';
import PropTypes from 'prop-types';

import Card, {
  CardImage, CardFooter,
} from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import IconMoreInfo from 'mineral-ui-icons/IconPersonOutline';
import apiRequests from '../../utils/apiRequests';

const { cardStyle, cardImageStyle, cardFooterStyle } = require('../../styles/card-styles');
const { buttonStyle } = require('../../styles/button-styles');

class PersonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    };
  }

  componentDidMount = async () => {
    const { id } = this.props;
    const details = await this.getDetails(id);
    this.setState({
      details,
    });
  }

  getDetails = async personId => apiRequests.getPerson(personId);

  render = () => {
    const { details } = this.state;
    const { onClick, onMatch } = this.props;
    const successIcon = <IconSuccess />;
    const moreInfoIcon = <IconMoreInfo />;
    if (details.data) {
      return (
        <div className="cardContainer">
          <Card style={cardStyle} className="personCard" data-cy="person-card">
            <CardImage
              style={cardImageStyle}
              className="cardImage"
              src={details.data.img_url}
              alt="gradient placeholder"
              onClick={onClick}
            />
            <CardFooter style={cardFooterStyle}>
              <Button style={buttonStyle} iconStart={successIcon} onClick={onMatch}>My Person</Button>
              <Button style={buttonStyle} className="cardButton" iconStart={moreInfoIcon} onClick={onClick} primary>More Like</Button>
            </CardFooter>
          </Card>
        </div>
      );
    }
    return null;
  }
}

PersonCard.defaultProps = {
  onClick: () => console.log('onClick prop not found'),
  onMatch: () => console.log('onMatch prop not found'),
};

PersonCard.propTypes = {
  onClick: PropTypes.func,
  onMatch: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default PersonCard;
