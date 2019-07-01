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
import RestartCard from '../cards/restart-card';
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
      appState: appStatus.SELECT_LANGUAGE,
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
          appState: appStatus.PIC_COMPARISON,
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
      appState: appStatus.WELCOME,
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
      submitLanguage={() => this.setState({ appState: appStatus.WELCOME })}
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
      startSearch={() => this.setState({ appState: appStatus.UPLOAD_PIC })}
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
        onFailure={() => this.setState({ appState: appStatus.FAILURE })}
        onMatch={id => this.setState({
          personId: id,
          appState: appStatus.MATCH_FOUND,
        })}
        onError={() => this.setServerError()}
      />
    );
  }

  getRestartCard = () => (
    <Flex
      {...flexStyle}
    >
      <RestartCard restart={() => this.setState({ appState: appStatus.WELCOME })} />
    </Flex>
  )

  getMatchCard = () => {
    const { personId } = this.state;
    return (
      <Flex
        {...flexStyle}
      >
        <MatchCard
          restart={() => this.setState({ appState: appStatus.WELCOME })}
          id={personId}
          onError={() => this.setServerError()}
        />
      </Flex>
    );
  }

  getMainPanel = () => {
    const { appState, error } = this.state;
    let content;
    switch (appState) {
      case appStatus.SELECT_LANGUAGE:
        content = this.getLanguageSelectionPanel();
        break;
      case appStatus.WELCOME:
        content = this.getWelcomeCard();
        break;
      case appStatus.UPLOAD_PIC:
        content = this.getUploadPicPanel();
        break;
      case appStatus.SELECT_GENDER:
        content = this.getGenderSelectionCards();
        break;
      case appStatus.SELECT_AGES:
        content = this.getAgeSelectionCards();
        break;
      case appStatus.SUBMIT_CHOICES:
        break;
      case appStatus.PIC_COMPARISON:
        content = this.getPersonSelectionPanel();
        break;
      case appStatus.FAILURE:
        content = this.getRestartCard();
        break;
      case appStatus.MATCH_FOUND:
        content = this.getMatchCard();
        break;
      case appStatus.ERROR:
        content = (
          <ErrorDialog
            error={error}
            restart={() => this.restart()}
          />
        );
        break;
      default:
        content = null;
        break;
    }
    return content;
  }

  render = () => {
    const PersonSelectionPanelComponent = this.getMainPanel();
    return (
      <div>
        <Header
          restart={() => this.restart()}
          goBack={() => this.goBack()}
        />
        {PersonSelectionPanelComponent}
      </div>
    );
  }
}

export default Dashboard;
