import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Flex, { FlexItem } from 'mineral-ui/Flex';

import PersonCard from '../../cards/person-card';
import NoMatchDialog from '../../dialogs/no-match-dialog';
import apiRequests from '../../../utils/apiRequests';

import Translate from '../../../locales/translate';

const { flexStyle } = require('../../../styles/flex-styles');

const PersonSelectionPanel = (props) => {
  const {
    restartApp, onError, onChoice, onMatch, decisions, viewedPeople, username,
  } = props;

  const [choices, setChoices] = useState([]);
  const [noDecisionsLeft, setNoDecisionsLeft] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const response = await apiRequests.getChoices({
          decisions,
          viewedPeople,
          username,
        });
        if (mounted) {
          if (response.data.choices.length === 0) {
            setNoDecisionsLeft(true);
          } else {
            setChoices(response.data.choices);
          }
        }
      } catch (err) {
        onError();
      }
    }
    fetchData();
    // useEffect cleanup function, avoids setting state on unmounted component
    return () => {
      mounted = false;
    };
  }, [decisions, viewedPeople, onError]);

  const reactToCardClick = (nextInput) => {
    onChoice(nextInput.decisions, nextInput.viewedPeople);
  };

  const reactToMatch = (personId) => {
    onMatch(personId);
  };

  const renderChildren = () => {
    const children = [];
    choices.forEach((choice) => {
      const { personId } = choice;
      children.push(
        <FlexItem key={personId} data-cy="PersonSelectionPanel">
          <PersonCard
            id={personId}
            onMatch={reactToMatch}
            onClick={() => reactToCardClick(choice.nextInput)}
            onError={onError}
          />
        </FlexItem>,
      );
    });
    return children;
  };

  return (
    <div className="cardContainer">
      <NoMatchDialog isOpen={noDecisionsLeft} restartApp={restartApp} />
      <h1>
        <Translate string="comparisonPanel.title" />
      </h1>
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
  restartApp: () => {},
  onChoice: () => {},
  decisions: [{}],
  viewedPeople: [],
};

PersonSelectionPanel.propTypes = {
  onError: PropTypes.func,
  restartApp: PropTypes.func,
  onFailure: PropTypes.func,
  onMatch: PropTypes.func,
  onChoice: PropTypes.func,
  viewedPeople: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  decisions: PropTypes.arrayOf(PropTypes.object),
};

export default PersonSelectionPanel;
