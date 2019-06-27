import React from 'react';
import Button from 'mineral-ui/Button';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import IconRestart from 'mineral-ui-icons/IconRefresh';
import Card, {
  CardImage, CardBlock, CardTitle,
} from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import apiRequests from '../../utils/apiRequests';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../styles/card-styles');
const { buttonStyle } = require('../../styles/button-styles');

const iconStyle = {
  color: '#61B7E1',
};

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
    const { restart } = this.props;
    const { details } = this.state;
    if (details.data) {
      const successMessage = `Yes, please reunite me with ${details.data.name}`;
      return (
        <div className="cardContainer" data-cy="match-card">
          <FlexItem>
            <Card style={matchCardStyle} data-cy="person-card">
              <CardTitle className="cardTitle">Is this your relative?</CardTitle>
              <CardImage
                style={cardImageStyle}
                className="matchCardImage"
                src={details.data.img_url}
                alt="gradient placeholder"
              />
              <CardBlock style={cardBlockStyle}>{`${details.data.name}, ${details.data.age}`}</CardBlock>
              <CardBlock>
                <Button style={buttonStyle} iconStart={<IconSuccess style={iconStyle} />} primary>
                  {successMessage}
                </Button>
                <Button style={buttonStyle} onClick={restart} iconStart={<IconRestart style={iconStyle} />}>No, keep searching</Button>
              </CardBlock>
            </Card>
          </FlexItem>
        </div>
      );
    }
    return null;
  };
}

MatchCard.defaultProps = {
  restart: () => console.log('restart prop not found'),
};

export default MatchCard;
