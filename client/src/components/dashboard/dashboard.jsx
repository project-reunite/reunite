import React from 'react';

import Flex from 'mineral-ui/Flex';

import './dashboard.scss';

import appStatus from '../../utils/appStatus';
import appOrder from '../../utils/appOrder';
import apiRequests from '../../utils/apiRequests';
import errorMessages from '../../utils/errorMessages';

import AgeSelectionPanel from '../panels/age-selection-panel';
import GenderSelectionPanel from '../panels/gender-selection-panel';
import LanguageSelectionPanel from '../panels/language-selection-panel';
import UploadPicPanel from '../panels/upload-pic-panel';
import WelcomeCard from '../panels/welcome-panel';
import NoMatchCard from '../cards/no-match-card';
import MatchCard from '../cards/match-card';
import PersonSelectionPanel from '../panels/person-selection-panel';
import Header from '../header';
import ErrorDialog from '../error-dialog';
import utilFunctions from '../../utils/util-functions';

const { flexStyle } = require('../../styles/flex-styles');

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      appState: appStatus.LANGUAGE_SELECT,
      gender: null,
      age: null,
      initialDecisionId: null,
      personId: null,
      error: null,
    };
  }

  componentDidUpdate = async () => {
    const { appState } = this.state;
    try {
      if (appState === appStatus.SUBMIT_CHOICES) {
        const response = await this.submitFilters();
        this.setState({
          initialDecisionId: response.data.docs[0].initialDecision_id,
          appState: appStatus.COMPARE_PICTURES,
        });
      }
    } catch (err) {
      this.setServerError();
    }
  }

  goBack = () => {
    const { appState } = this.state;
    const index = appOrder.indexOf(appState);
    if (index && index > 0) {
      this.setState({
        appState: appOrder[index - 1],
      });
    }
  }

  restart = () => {
    this.setState({
      appState: appStatus.WELCOME_PANEL,
    });
  }

  submitFilters = async () => {
    const { gender, age } = this.state;
    const ageQuery = utilFunctions.getAgeQueryString(age);
    const queryString = `gender=${gender}&${ageQuery}`;
    const response = await apiRequests.getTree(queryString);
    return response;
  }

  setServerError = () => {
    this.setState({
      appState: appStatus.ERROR,
      error: errorMessages.serverError,
    });
  }

  setGender = (gender) => {
    this.setState({
      gender,
      appState: appStatus.SELECT_AGES,
    });
  }

  setAge = (age) => {
    this.setState({
      age,
      appState: appStatus.SUBMIT_CHOICES,
    });
  }

  getLanguageSelectionPanel = () => (
    <LanguageSelectionPanel
      submitLanguage={() => this.setState({ appState: appStatus.WELCOME_PANEL })}
    />
  );

  getGenderSelectionCards = () => (
    <GenderSelectionPanel
      setGender={gender => this.setGender(gender)}
    />
  )

  getAgeSelectionCards = () => (
    <AgeSelectionPanel
      setAge={age => this.setAge(age)}
    />
  )

  getWelcomeCard = () => (
    <WelcomeCard
      startSearch={() => this.setState({ appState: appStatus.UPLOAD_PICTURE })}
    />
  )

  getUploadPicPanel = () => (
    <UploadPicPanel
      UploadPicPanel={this.uploadPicture}
      moveOn={() => this.setState({ appState: appStatus.SELECT_GENDER })}
    />
  )

  getPersonSelectionPanel = () => {
    const { initialDecisionId } = this.state;
    return (
      <PersonSelectionPanel
        startingDecisionID={initialDecisionId}
        onFailure={() => this.setState({ appState: appStatus.NO_MATCH_FOUND })}
        onMatch={id => this.setState({
          personId: id,
          appState: appStatus.MATCH_FOUND,
        })}
        onError={() => this.setServerError()}
      />
    );
  }

  getMatchCard = () => {
    const { personId } = this.state;
    return (
      <Flex
        {...flexStyle}
      >
        <MatchCard
          restart={() => this.setState({ appState: appStatus.WELCOME_PANEL })}
          id={personId}
          onError={() => this.setServerError()}
        />
      </Flex>
    );
  }

  getNoMatchCard = () => (
    <Flex
      {...flexStyle}
    >
      <NoMatchCard restart={() => this.setState({ appState: appStatus.WELCOME_PANEL })} />
    </Flex>
  )

  getErrorDialog = () => {
    const { error } = this.state;
    return (
      <ErrorDialog
        error={error}
        restart={() => this.restart()}
      />
    );
  }


  getMainPanel = () => {
    const { appState } = this.state;
    return (
      <div>
        {{
          [appStatus.LANGUAGE_SELECT]: this.getLanguageSelectionPanel(),
          [appStatus.WELCOME_PANEL]: this.getWelcomeCard(),
          [appStatus.UPLOAD_PICTURE]: this.getUploadPicPanel(),
          [appStatus.SELECT_GENDER]: this.getGenderSelectionCards(),
          [appStatus.SELECT_AGES]: this.getAgeSelectionCards(),
          [appStatus.COMPARE_PICTURES]: this.getPersonSelectionPanel(),
          [appStatus.MATCH_FOUND]: this.getMatchCard(),
          [appStatus.NO_MATCH_FOUND]: this.getNoMatchCard(),
          [appStatus.ERROR]: this.getNoMatchCard(),
        }[appState]}
      </div>
    );
  }

  render = () => {
    const MainPanel = this.getMainPanel();
    return (
      <div>
        <Header
          restart={() => this.restart()}
          goBack={() => this.goBack()}
        />
        {MainPanel}
      </div>
    );
  }
}

export default Dashboard;
