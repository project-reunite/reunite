import React from 'react';
import PropTypes from 'prop-types';

import Card, {
  CardImage, CardFooter,
} from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import IconMoreInfo from 'mineral-ui-icons/IconPersonOutline';
import apiRequests from '../../utils/apiRequests';

const { regularCardStyle, cardImageStyle, cardFooterStyle } = require('../../styles/card-styles');
const { buttonStyle, secondButtonStyle } = require('../../styles/button-styles');
const { iconStyle } = require('../../styles/icon-styles');

class PersonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    };
  }

  componentDidMount = async () => {
    const { id, onError } = this.props;
    try {
      const details = await this.getDetails(id);
      this.setState({
        details,
      });
    } catch (err) {
      onError();
    }
  }

  getDetails = async personId => apiRequests.getPerson(personId);

  render = () => {
    const { details } = this.state;
    const { onClick, onMatch } = this.props;
    const successIcon = <IconSuccess style={iconStyle} />;
    const moreInfoIcon = <IconMoreInfo style={iconStyle} />;
    if (details.data) {
      return (
        <div className="cardContainer">
          <Card style={regularCardStyle} className="personCard" data-cy="person-card">
            <CardImage
              style={cardImageStyle}
              className="cardImage"
              src={details.data.img_url}
              alt="gradient placeholder"
              onClick={onClick}
            />
            <CardFooter style={cardFooterStyle}>
              <Button
                style={secondButtonStyle}
                iconStart={successIcon}
                onClick={onMatch}
                data-cy="select-match"
              >
              My Person
              </Button>
              <Button
                style={buttonStyle}
                className="cardButton"
                iconStart={moreInfoIcon}
                onClick={onClick}
              >
                Similar
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }
    return null;
  }
}

PersonCard.defaultProps = {
  onClick: () => {},
  onMatch: () => {},
  onError: () => {},
};

PersonCard.propTypes = {
  onError: PropTypes.func,
  onClick: PropTypes.func,
  onMatch: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default PersonCard;
