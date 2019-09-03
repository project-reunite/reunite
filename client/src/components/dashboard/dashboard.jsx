import React, { useState, useEffect } from 'react';

import Flex from 'mineral-ui/Flex';

import './dashboard.scss';

import appStatus from '../../utils/appStatus';
import appOrder from '../../utils/appOrder';
import apiRequests from '../../utils/apiRequests';
import errorMessages from '../../utils/errorMessages';
import utilFunctions from '../../utils/util-functions';

import AgeSelectionPanel from '../panels/age-selection-panel';
import ErrorDialog from '../dialogs/error-dialog';
import GenderSelectionPanel from '../panels/gender-selection-panel';
import Header from '../header';
import LanguageSelectionPanel from '../panels/language-selection-panel';
import MatchCard from '../cards/match-card';
import PersonSelectionPanel from '../panels/person-selection-panel';
import WelcomeCard from '../panels/welcome-panel';
import UploadPicPanel from '../panels/upload-pic-panel';

const { flexStyle } = require('../../styles/flex-styles');

const Dashboard = () => {
  const [appState, setAppState] = useState(appStatus.LANGUAGE_SELECT);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [currentDecisionId, setCurrentDecisionId] = useState(null);
  const [personId, setPersonId] = useState(null);
  const [error, setError] = useState(null);

  const goBack = () => {
    const index = appOrder.indexOf(appState);
    if (index && index > 0) {
      setAppState(appOrder[index - 1]);
    }
  };

  const restart = () => {
    setAppState(appStatus.WELCOME_PANEL);
  };

  const setDataError = () => {
    setAppState(appStatus.ERROR);
    setError(errorMessages.dataError);
  };

  const setServerError = () => {
    setAppState(appStatus.ERROR);
    setError(errorMessages.serverError);
  };

  const setGenderChoice = (genderChoice) => {
    setGender(genderChoice);
    setAppState(appStatus.SELECT_AGES);
  };

  const setAgeChoice = (ageChoice) => {
    setAge(ageChoice);
    setAppState(appStatus.SUBMIT_CHOICES);
  };

  const getLanguageSelectionPanel = () => (
    <LanguageSelectionPanel submitLanguage={() => setAppState(appStatus.WELCOME_PANEL)} />
  );

  const getGenderSelectionCards = () => (
    <GenderSelectionPanel setGender={genderChoice => setGenderChoice(genderChoice)} />
  );

  const getAgeSelectionCards = () => (
    <AgeSelectionPanel setAge={ageChoice => setAgeChoice(ageChoice)} />
  );

  const getWelcomeCard = () => (
    <WelcomeCard startSearch={() => setAppState(appStatus.UPLOAD_PICTURE)} />
  );

  const getUploadPicPanel = () => (
    <UploadPicPanel moveOn={() => setAppState(appStatus.SELECT_GENDER)} />
  );

  const getPersonSelectionPanel = () => (
    <PersonSelectionPanel
      startingDecisionID={currentDecisionId}
      onFailure={() => setAppState(appStatus.NO_MATCH_FOUND)}
      onMatch={(person, decisionId) => {
        setPersonId(person);
        setCurrentDecisionId(decisionId);
        setAppState(appStatus.MATCH_FOUND);
      }}
      onError={() => setServerError()}
      restart={() => setAppState(appStatus.WELCOME_PANEL)}
    />
  );

  const getMatchCard = () => (
    <Flex {...flexStyle}>
      <MatchCard
        restart={() => setAppState(appStatus.WELCOME_PANEL)}
        id={personId}
        onError={() => setServerError()}
        continueSearch={() => setAppState(appStatus.COMPARE_PICTURES)}
      />
    </Flex>
  );

  const getErrorDialog = () => <ErrorDialog error={error} restart={restart} close={restart} />;

  // Called to submit choices of age and gender
  useEffect(() => {
    async function fetchData() {
      try {
        const ageQuery = utilFunctions.getAgeQueryString(age);
        const queryString = `gender=${gender}&${ageQuery}`;
        const response = await apiRequests.getTree(queryString);
        if (response.data.docs.length === 0) {
          setDataError();
        } else {
          setCurrentDecisionId(response.data.docs[0].initialDecision_id);
          setAppState(appStatus.COMPARE_PICTURES);
        }
      } catch (err) {
        setServerError();
      }
    }
    if (appState === appStatus.SUBMIT_CHOICES) {
      fetchData();
    }
  }, [appState, age, gender]);

  const getMainPanel = () => (
    <div>
      {
        {
          [appStatus.LANGUAGE_SELECT]: getLanguageSelectionPanel(),
          [appStatus.WELCOME_PANEL]: getWelcomeCard(),
          [appStatus.UPLOAD_PICTURE]: getUploadPicPanel(),
          [appStatus.SELECT_GENDER]: getGenderSelectionCards(),
          [appStatus.SELECT_AGES]: getAgeSelectionCards(),
          [appStatus.COMPARE_PICTURES]: getPersonSelectionPanel(),
          [appStatus.MATCH_FOUND]: getMatchCard(),
          [appStatus.ERROR]: getErrorDialog(),
        }[appState]
      }
    </div>
  );

  const MainPanel = getMainPanel();

  return (
    <div>
      <Header restart={restart} goBack={goBack} />
      {MainPanel}
    </div>
  );
};

export default Dashboard;
