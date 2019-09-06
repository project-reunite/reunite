import React, { useState, useEffect } from 'react';

import Flex from 'mineral-ui/Flex';

import './dashboard.scss';

import appStatus from '../../utils/appStatus';
import appOrder from '../../utils/appOrder';

import LanguageSelectionPanel from '../panels/language-selection-panel';
import WelcomeCard from '../panels/welcome-panel';
import ErrorDialog from '../dialogs/error-dialog';
import Header from '../header';
import PersonSelectionPanel from '../panels/person-selection-panel';
import MatchCard from '../cards/match-card';
import DemoInfoPanel from '../panels/demo-info-panel';
import Footer from '../footer';

const { flexStyle } = require('../../styles/flex-styles');

const Dashboard = (props) => {
  const [appState, setAppState] = useState(appStatus.LANGUAGE_SELECT);
  const [personId, setPersonId] = useState(null);
  const [decisions, setDecisions] = useState([{}]);
  const [viewedPeople, setViewedPeople] = useState([]);

  const { changeLanguage } = props;

  const removeLastChoice = () => {
    setViewedPeople(viewedPeople.slice(0, -2));
    setDecisions(decisions.slice(0, -1));
  };

  const goBack = () => {
    const index = appOrder.indexOf(appState);
    if (appState === appStatus.COMPARE_PICTURES && viewedPeople.length !== 0) {
      removeLastChoice();
    } else if (index && index > 0) {
      setAppState(appOrder[index - 1]);
    }
  };

  const resetChoices = () => {
    setViewedPeople([]);
    setDecisions([{}]);
  };

  const restartApp = () => {
    resetChoices();
    setAppState(appStatus.LANGUAGE_SELECT);
  };

  const setServerError = () => {
    setAppState(appStatus.ERROR);
  };

  const getLanguageSelectionPanel = () => (
    <LanguageSelectionPanel
      submitLanguage={(code) => {
        changeLanguage(code);
        setAppState(appStatus.WELCOME_PANEL);
      }}
    />
  );

  const getWelcomeCard = () => (
    <WelcomeCard moveOn={() => setAppState(appStatus.DEMO_INFO_PANEL)} />
  );

  const getPersonSelectionPanel = () => (
    <PersonSelectionPanel
      decisions={decisions}
      viewedPeople={viewedPeople}
      onChoice={(decisionList, viewedPeopleList) => {
        setDecisions(decisionList);
        setViewedPeople(viewedPeopleList);
      }}
      onMatch={(person) => {
        setPersonId(person);
        setAppState(appStatus.MATCH_FOUND);
      }}
      onError={() => setAppState(appStatus.ERROR)}
      restartApp={restartApp}
    />
  );

  const getMatchCard = () => (
    <Flex {...flexStyle}>
      <MatchCard
        restartApp={restartApp}
        id={personId}
        onError={() => setServerError()}
        continueSearch={() => {
          setAppState(appStatus.COMPARE_PICTURES);
        }}
      />
    </Flex>
  );

  const getDemoInfoPanel = () => (
    <DemoInfoPanel moveOn={() => setAppState(appStatus.COMPARE_PICTURES)} />
  );

  const getErrorDialog = () => <ErrorDialog restartApp={restartApp} close={restartApp} />;

  const getMainPanel = () => (
    <div>
      {
        {
          [appStatus.LANGUAGE_SELECT]: getLanguageSelectionPanel(),
          [appStatus.WELCOME_PANEL]: getWelcomeCard(),
          [appStatus.DEMO_INFO_PANEL]: getDemoInfoPanel(),
          [appStatus.COMPARE_PICTURES]: getPersonSelectionPanel(),
          [appStatus.MATCH_FOUND]: getMatchCard(),
          [appStatus.ERROR]: getErrorDialog(),
        }[appState]
      }
    </div>
  );

  const MainPanel = getMainPanel();

  return (
    <div className="dashboardContainer">
      <Header submitLanguage={changeLanguage} restartApp={restartApp} goBack={goBack} />
      {MainPanel}
      <Footer />
    </div>
  );
};

export default Dashboard;
