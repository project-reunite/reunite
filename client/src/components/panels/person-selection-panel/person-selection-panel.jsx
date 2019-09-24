import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Flex, { FlexItem } from 'mineral-ui/Flex';
import Button from 'mineral-ui/Button';
import IconNavigateNext from 'mineral-ui-icons/IconSkipNext';

import PersonCard from '../../cards/person-card';
import NoMatchDialog from '../../dialogs/no-match-dialog';
import apiRequests from '../../../utils/apiRequests';
import Translate from '../../../locales/translate';

const { flexStyle } = require('../../../styles/flex-styles');
const { responsiveSecondButtonStyle } = require('../../../styles/button-styles');
const { iconStyle } = require('../../../styles/icon-styles');

const PersonSelectionPanel = (props) => {
  const {
    restartApp,
    isMobile,
    onError,
    onChoice,
    onMatch,
    onSkip,
    decisions,
    viewedPeople,
    username,
  } = props;

  const [choiceData, setChoiceData] = useState({});
  const [noDecisionsLeft, setNoDecisionsLeft] = useState(false);
  const buttonStyle = responsiveSecondButtonStyle(isMobile);

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
            setChoiceData(response.data);
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
  }, [decisions, viewedPeople, onError, username]);

  const reactToSkip = (choices) => {
    if (choices.skipInput) onSkip(choices.skipInput.viewedPeople);
  };

  const reactToCardClick = (nextInput) => {
    onChoice(nextInput.decisions, nextInput.viewedPeople);
  };

  const reactToMatch = (personId) => {
    onMatch(personId);
  };

  const renderChildren = () => {
    const children = [];
    if (choiceData.choices) {
      choiceData.choices.forEach((choice) => {
        const { personId } = choice;
        children.push(
          <FlexItem key={personId} data-cy="PersonSelectionPanel">
            <PersonCard
              id={personId}
              onMatch={reactToMatch}
              onClick={() => reactToCardClick(choice.nextInput)}
              onError={onError}
              isMobile={isMobile}
            />
          </FlexItem>,
        );
      });
    }
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
      <Button
        className="skipButton"
        iconStart={<IconNavigateNext style={iconStyle} />}
        style={{ ...buttonStyle }}
        onClick={() => reactToSkip(choiceData)}
      >
        <Translate string="button.skip-choice" />
      </Button>
    </div>
  );
};

PersonSelectionPanel.defaultProps = {
  onFailure: () => {},
  onMatch: () => {},
  onSkip: () => {},
  onError: () => {},
  restartApp: () => {},
  onChoice: () => {},
  isMobile: false,
  decisions: [{}],
  viewedPeople: [],
  username: '',
};

PersonSelectionPanel.propTypes = {
  onError: PropTypes.func,
  restartApp: PropTypes.func,
  onFailure: PropTypes.func,
  onMatch: PropTypes.func,
  onChoice: PropTypes.func,
  isMobile: PropTypes.bool,
  onSkip: PropTypes.func,
  viewedPeople: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  decisions: PropTypes.arrayOf(PropTypes.object),
  username: PropTypes.string,
};

export default PersonSelectionPanel;
