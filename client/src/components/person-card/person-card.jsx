import React from 'react';
import PropTypes from 'prop-types';

import './person-card.scss';

import Card, {
  CardImage, CardTitle, CardBlock,
} from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';
import apiRequests from '../../utils/apiRequests';

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
    const cardStyle = { borderRadius: '20px' };
    if (details.data) {
      return (
        <div>
          <Card style={cardStyle} data-cy="person-card">
            <CardTitle>{details.data.name}</CardTitle>
            <CardImage
              className="cardImage"
              src={details.data.img_url}
              alt="gradient placeholder"
              onClick={onClick}
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
