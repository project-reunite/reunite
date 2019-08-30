import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Flex, { FlexItem } from 'mineral-ui/Flex';

import PersonCard from '../../cards/person-card';
import NoMatchDialog from '../../dialogs/no-match-dialog';
import apiRequests from '../../../utils/apiRequests';

const { flexStyle } = require('../../../styles/flex-styles');

const PersonSelectionPanel = (props) => {
  const [choices, setChoices] = useState([]);
  const [decisionId, setDecisionId] = useState(undefined);
  const [noDecisionsLeft, setNoDecisionsLeft] = useState(false);
  const {
    restart, startingDecisionID, onError, onMatch,
  } = props;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiRequests.getChoices(decisionId);
        setChoices(response.data.choices);
      } catch (err) {
        onError();
      }
    }
    if (decisionId) {
      fetchData();
    }
  }, [decisionId, onError]);

  useEffect(() => {
    async function fetchData() {
      const response = await apiRequests.getChoices(startingDecisionID);
      if (response.data) {
        setChoices(response.data.choices);
      }
    }
    fetchData();
  }, [startingDecisionID]);

  const reactToCardClick = (nextDecisionId) => {
    if (nextDecisionId) {
      setDecisionId(nextDecisionId);
    } else {
      setNoDecisionsLeft(true);
    }
  };

  const reactToMatch = (personId) => {
    const currentDecisionId = decisionId || startingDecisionID;
    onMatch(personId, currentDecisionId);
  };

  const renderChildren = () => {
    const children = [];
    choices.forEach((choice) => {
      const personId = choice.persons_id;
      const nextDecisionId = choice.next_decision_id;
      children.push(
        <FlexItem key={personId} data-cy="PersonSelectionPanel">
          <PersonCard
            id={personId}
            onMatch={() => reactToMatch(personId)}
            onClick={() => reactToCardClick(nextDecisionId)}
            onError={onError}
          />
        </FlexItem>,
      );
    });
    return children;
  };

  return (
    <div className="cardContainer">
      <NoMatchDialog
        isOpen={noDecisionsLeft}
        closeDialog={() => setNoDecisionsLeft(false)}
        restartApp={restart}
      />
      <Flex wrap {...flexStyle}>
        {renderChildren()}
      </Flex>
    </div>
  );
};

PersonSelectionPanel.defaultProps = {
  onFailure: () => {},
  onMatch: () => {},
  onError: () => {},
  restart: () => {},
  startingDecisionID: '0',
};

PersonSelectionPanel.propTypes = {
  onError: PropTypes.func,
  restart: PropTypes.func,
  onFailure: PropTypes.func,
  onMatch: PropTypes.func,
  startingDecisionID: PropTypes.string,
};

export default PersonSelectionPanel;
