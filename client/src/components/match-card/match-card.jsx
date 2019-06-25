import React from 'react';
import PropTypes from 'prop-types';
import Button from 'mineral-ui/Button';
import IconRestart from 'mineral-ui-icons/IconRefresh';
import Card, {
  CardImage, CardBlock, CardTitle,
} from 'mineral-ui/Card';
import apiRequests from '../../utils/apiRequests';


const { cardStyle, cardImageStyle, cardBlockStyle } = require('../../styles/card-styles');

class MatchCard extends React.Component {
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
    const { restart } = this.props;
    const icon = <IconRestart />;
    if (details.data) {
      return (
        <div className="cardContainer" data-cy="match-card">
          <Card style={cardStyle} data-cy="person-card">
            <CardTitle className="cardTitle">Match Found</CardTitle>
            <CardImage
              style={cardImageStyle}
              className="cardImage"
              src={details.data.img_url}
              alt="gradient placeholder"
            />
            <CardBlock style={cardBlockStyle}>{details.data.name}</CardBlock>
            <CardBlock style={cardBlockStyle}>{details.data.age}</CardBlock>
            <CardBlock>
              <Button iconStart={icon} primary onClick={restart}>Restart</Button>
            </CardBlock>
          </Card>
        </div>
      );
    }
    return null;
  };
}

MatchCard.defaultProps = {
  restart: () => console.log('restart prop not found'),
};

MatchCard.propTypes = {
  restart: PropTypes.func,
};


export default MatchCard;
