import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './person-card.scss';

import Card, {
  CardImage, CardTitle, CardBlock,
} from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';

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

  getDetails = async (personId) => {
    try {
      const response = await axios.get(`http://localhost:9100/api/v1/persons/${personId}`);
      return response;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  render = () => {
    const { details } = this.state;
    const { onClick, onMatch } = this.props;
    const cardStyle = { borderRadius: '20px' };
    if (details.data) {
      return (
        <div>
          <Card onClick={onClick} style={cardStyle} data-cy="person-card">
            <CardTitle>{details.data.name}</CardTitle>
            <CardImage
              className="cardImage"
              src={details.data.img_url}
              alt="gradient placeholder"
            />
            <CardBlock>
              <Button fullWidth onClick={onMatch}>Select Match</Button>
            </CardBlock>
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
