import React from 'react';
import PropTypes from 'prop-types';
import Button from 'mineral-ui/Button';
import IconRestart from 'mineral-ui-icons/IconRefresh';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import Card, {
  CardImage, CardBlock, CardTitle,
} from 'mineral-ui/Card';
import apiRequests from '../../utils/apiRequests';


const { regularCardStyle, cardImageStyle, cardBlockStyle } = require('../../styles/card-styles');
const { buttonStyle } = require('../../styles/button-styles');

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
    if (details.data) {
      return (
        <div className="cardContainer" data-cy="match-card">
          <Card style={regularCardStyle} data-cy="person-card">
            <CardTitle className="cardTitle">Match Found</CardTitle>
            <CardImage
              style={cardImageStyle}
              className="cardImage"
              src={details.data.img_url}
              alt="gradient placeholder"
            />
            <CardBlock style={cardBlockStyle}>{`${details.data.name}, ${details.data.age}`}</CardBlock>
            <CardBlock style={cardBlockStyle}>Please contact an aid worker</CardBlock>
            <CardBlock>
              <Button style={buttonStyle} iconStart={<IconSuccess />} primary>Confirm</Button>
              <Button style={buttonStyle} iconStart={<IconRestart />} onClick={restart}>Restart</Button>
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
