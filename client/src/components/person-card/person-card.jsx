import React from 'react';
import axios from 'axios';

import './person-card.scss';

import Card, {
  CardImage, CardTitle, CardActions, CardBlock,
} from 'mineral-ui/Card';
import Button from 'mineral-ui/Button';

class PersonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    };
  }

  async componentDidMount() {
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

render() {
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

export default PersonCard;
