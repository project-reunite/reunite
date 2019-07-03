import React from 'react';
import PropTypes from 'prop-types';

import Button from 'mineral-ui/Button';
import IconSuccess from 'mineral-ui-icons/IconSuccess';
import IconCancel from 'mineral-ui-icons/IconCancel';
import Card, {
  CardImage, CardBlock, CardTitle,
} from 'mineral-ui/Card';
import { FlexItem } from 'mineral-ui/Flex';
import apiRequests from '../../../utils/apiRequests';
import ConfirmMatchDialog from '../../dialogs/confirm-match-dialog';

const { matchCardStyle, cardImageStyle, cardBlockStyle } = require('../../../styles/card-styles');
const { buttonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

class MatchCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      isMatchConfirmed: false,
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

  handleClose() {
    this.setState({
      isMatchConfirmed: false,
    });
  }

  render = () => {
    const { continueSearch } = this.props;
    const { details, isMatchConfirmed } = this.state;
    if (details.data) {
      const successMessage = `Yes, please reunite me with ${details.data.name}`;
      const matchCard = (
        <div>
          <ConfirmMatchDialog
            isOpen={isMatchConfirmed}
            closeDialog={() => this.handleClose()}
            message="Aid worker contacted!"
            title="Success"
          />
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
                  <Button
                    style={buttonStyle}
                    iconStart={<IconSuccess style={iconStyle} />}
                    primary
                    onClick={() => this.setState({
                      isMatchConfirmed: true,
                    })}
                  >
                    {successMessage}
                  </Button>
                  <Button
                    style={buttonStyle}
                    onClick={continueSearch}
                    iconStart={<IconCancel style={iconStyle} />}
                  >
                  No, keep searching
                  </Button>
                </CardBlock>
              </Card>
            </FlexItem>
          </div>
        </div>
      );
      return matchCard;
    }
    return null;
  };
}


MatchCard.defaultProps = {
  continueSearch: () => {},
  onError: () => {},
  id: '0',
};

MatchCard.propTypes = {
  onError: PropTypes.func,
  continueSearch: PropTypes.func,
  id: PropTypes.string,
};

export default MatchCard;
