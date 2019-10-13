import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import Flex from 'mineral-ui/Flex';

import './main-app-screen.scss';

import appStatus from '../../../utils/appStatus';
import appOrder from '../../../utils/appOrder';
import { origin } from '../../../config';

import LanguageSelectionPanel from '../../panels/language-selection-panel';
import WelcomeCard from '../../panels/welcome-panel';
import ErrorDialog from '../../dialogs/error-dialog';
import Header from '../../header';
import PersonSelectionPanel from '../../panels/person-selection-panel';
import MatchCard from '../../cards/match-card';
import DemoInfoPanel from '../../panels/demo-info-panel';
import DemoSummaryPanel from '../../panels/demo-summary-panel';
import FurtherInfoPanel from '../../panels/further-info-panel';
import Footer from '../../footer';
import apiRequests from '../../../utils/apiRequests';
import Translate from '../../../locales/translate';
import useWindowSize from '../../../hooks/useWindowSize';

const { flexStyle } = require('../../../styles/flex-styles');

const MainAppScreen = (props) => {
  const [appState, setAppState] = useState(appStatus.LANGUAGE_SELECT);
  const [decisions, setDecisions] = useState([{}]);
  const [viewedPeople, setViewedPeople] = useState([]);
  const [foundPersonDetails, setFoundPersonDetails] = useState({});
  const [userActions, setUserActions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [username, setUsername] = useState('');
  // const [uid, setUid] = useState('');

  const size = useWindowSize();

  useEffect(() => {
    setIsMobile(size.width < 600);
  }, [size]);

  const { changeLanguage } = props;

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      if (mounted) {
        const response = await apiRequests.postUser();
        // localStorage.setItem('username', response.data);
        setUsername(response.data);
        socketIOClient(origin, {
          query: `username=${response.data}`,
        });
      }
    }
    fetchData();
    // useEffect cleanup function, avoids setting state on unmounted component
    return () => {
      mounted = false;
    };
  }, []);

  const removeLastChoice = () => {
    setViewedPeople(viewedPeople.slice(0, -2));
    if (userActions[userActions.length - 1] === 'select') {
      setDecisions(decisions.slice(0, -1));
    }
    setUserActions(userActions.slice(0, -1));
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

  const getLanguageSelectionPanel = () => (
    <LanguageSelectionPanel
      submitLanguage={(code) => {
        changeLanguage(code);
        setAppState(appStatus.WELCOME_PANEL);
      }}
    />
  );

  const getWelcomeCard = () => (
    <WelcomeCard isMobile={isMobile} moveOn={() => setAppState(appStatus.DEMO_INFO_PANEL)} />
  );

  const getDemoInfoPanel = () => (
    <DemoInfoPanel isMobile={isMobile} moveOn={() => setAppState(appStatus.COMPARE_PICTURES)} />
  );

  const getPersonSelectionPanel = () => (
    <PersonSelectionPanel
      username={username}
      isMobile={isMobile}
      decisions={decisions}
      viewedPeople={viewedPeople}
      onChoice={(decisionList, viewedPeopleList) => {
        const newUserActions = [...userActions];
        newUserActions.push('select');
        setUserActions(newUserActions);
        setDecisions(decisionList);
        setViewedPeople(viewedPeopleList);
      }}
      onSkip={(viewedPeopleList) => {
        const newUserActions = [...userActions];
        newUserActions.push('skip');
        setUserActions(newUserActions);
        setViewedPeople(viewedPeopleList);
      }}
      onMatch={(person) => {
        setFoundPersonDetails(person);
        setAppState(appStatus.MATCH_FOUND);
      }}
      onError={() => setAppState(appStatus.ERROR)}
      restartApp={restartApp}
    />
  );

  const getMatchCard = () => (
    <Flex {...flexStyle}>
      <MatchCard
        foundPersonDetails={foundPersonDetails}
        isMobile={isMobile}
        confirmMatch={() => {
          setAppState(appStatus.DEMO_COMPLETE);
          apiRequests.postStatistics(foundPersonDetails._id);
        }}
        continueSearch={() => {
          setFoundPersonDetails({});
          setAppState(appStatus.COMPARE_PICTURES);
        }}
      />
    </Flex>
  );

  const getDemoSummaryPanel = () => (
    <DemoSummaryPanel
      foundPersonDetails={foundPersonDetails}
      decisions={decisions}
      isMobile={isMobile}
      moveOn={() => setAppState(appStatus.FURTHER_INFO)}
    />
  );

  const getFurtherInfoPanel = () => <FurtherInfoPanel isMobile={isMobile} />;

  const getErrorDialog = () => <ErrorDialog restartApp={restartApp} close={restartApp} />;

  const getMainPanel = () => (
    <div className="mainPanel">
      {
        {
          [appStatus.LANGUAGE_SELECT]: getLanguageSelectionPanel(),
          [appStatus.WELCOME_PANEL]: getWelcomeCard(),
          [appStatus.DEMO_INFO_PANEL]: getDemoInfoPanel(),
          [appStatus.COMPARE_PICTURES]: getPersonSelectionPanel(),
          [appStatus.MATCH_FOUND]: getMatchCard(),
          [appStatus.DEMO_COMPLETE]: getDemoSummaryPanel(),
          [appStatus.FURTHER_INFO]: getFurtherInfoPanel(),
          [appStatus.ERROR]: getErrorDialog(),
        }[appState]
      }
    </div>
  );

  const usernameDisplay = username ? (
    <h4 className="demoUsername">
      <Translate string="demo.username" />
      {`: ${username}`}
    </h4>
  ) : null;

  const MainPanel = getMainPanel();

  return (
    <div className="dashboardContainer">
      <Header submitLanguage={changeLanguage} restartApp={restartApp} goBack={goBack} />
      {usernameDisplay}
      {MainPanel}
      <div className="footerPadding" />
      <Footer />
    </div>
  );
};

MainAppScreen.defaultProps = {
  changeLanguage: () => {},
};

MainAppScreen.propTypes = {
  changeLanguage: PropTypes.func,
};

export default MainAppScreen;
