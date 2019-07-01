import React from 'react';
import PropTypes from 'prop-types';

import Flex, { FlexItem } from 'mineral-ui/Flex';

import PersonCard from '../../cards/person-card';
import apiRequests from '../../../utils/apiRequests';

const { flexStyle } = require('../../../styles/flex-styles');

class PersonSelectionPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      decisionId: undefined,
    };
  }

  componentDidMount = async () => {
    const { startingDecisionID } = this.props;
    const response = await this.getPersonSelectionPanelChoices(startingDecisionID);
    if (response.data) {
      this.setState({ choices: response.data.choices });
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { decisionId } = this.state;
    const { onError } = this.props;
    try {
      if (prevState && prevState.decisionId !== decisionId) {
        const response = await this.getPersonSelectionPanelChoices(decisionId);
        this.setState({ choices: response.data.choices });
      }
    } catch (err) {
      onError();
    }
  }

  getPersonSelectionPanelChoices = async decisionId => apiRequests.getChoices(decisionId)

  reactToCardClick = (nextDecisionId) => {
    const { onFailure } = this.props;
    if (nextDecisionId) {
      this.setState({ decisionId: nextDecisionId });
    } else {
      onFailure();
    }
  }

  reactToMatch = (personId) => {
    const { onMatch, startingDecisionID } = this.props;
    const { decisionId } = this.state;
    const currentDecisionId = (decisionId || startingDecisionID);
    onMatch(personId, currentDecisionId);
  }

  renderChildren = (choices) => {
    const { onError } = this.props;
    const children = [];
    choices.forEach((choice) => {
      const personId = choice.persons_id;
      const nextDecisionId = choice.next_decision_id;
      children.push(
        <FlexItem key={personId} data-cy="PersonSelectionPanel">
          <PersonCard
            id={personId}
            onMatch={(() => this.reactToMatch(personId))}
            onClick={() => this.reactToCardClick(nextDecisionId)}
            onError={onError}
          />
        </FlexItem>,
      );
    });
    return children;
  }

  render = () => {
    const { choices } = this.state;
    return (
      <div className="cardContainer">
        <Flex
          wrap
          {...flexStyle}
        >
          {this.renderChildren(choices)}
        </Flex>
      </div>
    );
  }
}

PersonSelectionPanel.defaultProps = {
  onFailure: () => {},
  onMatch: () => {},
  onError: () => {},
  startingDecisionID: '0',
};

PersonSelectionPanel.propTypes = {
  onError: PropTypes.func,
  onFailure: PropTypes.func,
  onMatch: PropTypes.func,
  startingDecisionID: PropTypes.string,
};

export default PersonSelectionPanel;
