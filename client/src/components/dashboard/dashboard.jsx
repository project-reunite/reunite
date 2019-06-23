import React from 'react';

import Grid, { GridItem } from 'mineral-ui/Grid';
import appStatus from '../../utils/appStatus';
import genders from '../../utils/genders';
import ages from '../../utils/ages';
import apiRequests from '../../utils/apiRequests';

import UploadPicPanel from '../upload-pic-panel';
import SelectionCard from '../selection-card';
import WelcomePanel from '../welcome-panel';
import RestartPanel from '../restart-panel';
import MatchCard from '../match-card';
import Deck from '../deck';
import Header from '../header';

const ageUrls = {
  BABY: 'baby.svg',
  CHILD: 'child.svg',
  ADULT: 'adult.svg',
  ELDERLY: 'elderly.svg',
};

const genderUrls = {
  Male: 'man-icon.svg',
  Female: 'woman-icon.svg',
};

const getAgeQueryString = (age) => {
  if (age === ages.BABY) return 'minAge=0&maxAge=4';
  if (age === ages.CHILD) return 'minAge=5&maxAge=18';
  if (age === ages.ADULT) return 'minAge=19&maxAge=60';
  if (age === ages.ELDERLY) return 'minAge=61&maxAge=100';
  return '';
};

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      appState: appStatus.WELCOME,
      gender: null,
      age: null,
      initialDecisionId: null,
    };
  }

  componentDidUpdate = async () => {
    const { appState } = this.state;
    if (appState === appStatus.SUBMIT_CHOICES) {
      const response = await this.submitFilters();
      this.setState({
        initialDecisionId: response.data.docs[0].initialDecision_id,
        appState: appStatus.PIC_COMPARISON,
      });
    }
  }

  submitFilters = async () => {
    const { gender, age } = this.state;
    const ageQuery = getAgeQueryString(age);
    const queryString = `gender=${gender}&${ageQuery}`;
    const response = await apiRequests.getTree(queryString);
    return response;
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

  getGenderSelectionCards = () => {
    const genderList = Object.values(genders);
    const items = [];
    const gridStyle = { padding: '30px' };
    for (let i = 0; i < genderList.length; i += 1) {
      const props = {
        setSelection: this.setGender,
        selection: genderList[i],
        urls: genderUrls,
        cyTag: `gender-selection-card-${genderList[i]}`,
      };
      items.push(
        <GridItem>
          <SelectionCard {...props} />
        </GridItem>,
      );
    }
    return <Grid gutterWidth="lg" style={gridStyle}>{items}</Grid>;
  }

  getAgeSelectionCards = () => {
    const ageList = Object.values(ages);
    const items = [];
    const gridStyle = { padding: '30px' };
    for (let i = 0; i < ageList.length; i += 1) {
      const props = {
        setSelection: this.setAge,
        selection: ageList[i],
        urls: ageUrls,
        cyTag: `age-selection-card-${ageList[i]}`,
      };
      items.push(
        <GridItem>
          <SelectionCard {...props} />
        </GridItem>,
      );
    }
    return <Grid gutterWidth="lg" style={gridStyle}>{items}</Grid>;
  }

  getWelcomePanel = () => (
    <WelcomePanel
      startSearch={() => this.setState({ appState: appStatus.UPLOAD_PIC })}
    />
  )

  getUploadPicPanel = () => (
    <UploadPicPanel
      UploadPicPanel={this.uploadPicture}
      moveOn={() => this.setState({ appState: appStatus.SELECT_GENDER })}
    />
  )

  getDeck = () => {
    const { initialDecisionId } = this.state;
    return (
      <Deck
        startingDecisionID={initialDecisionId}
        onFailure={() => this.setState({ appState: appStatus.FAILURE })}
        onMatch={() => this.setState({ appState: appStatus.MATCH_FOUND })}
      />
    );
  }

  getRestartPanel = () => (
    <RestartPanel restart={() => this.setState({ appState: appStatus.WELCOME })} />
  )

  getMatchCard = () => (
    <MatchCard restart={() => this.setState({ appState: appStatus.WELCOME })} />
  )

  getMainPanel = () => {
    const { appState } = this.state;
    let content;
    switch (appState) {
      case appStatus.WELCOME:
        content = this.getWelcomePanel();
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
      // ComponentDidMount makes async call to submit choices
        break;
      case appStatus.PIC_COMPARISON:
        content = this.getDeck();
        break;
      case appStatus.FAILURE:
        content = this.getRestartPanel();
        break;
      case appStatus.MATCH_FOUND:
        content = this.getMatchCard();
        break;
      default:
        content = <Deck />;
        break;
    }
    return content;
  }

  render = () => {
    const deckComponent = this.getMainPanel();
    return (
      <div>
        <Header />
        {deckComponent}
      </div>
    );
  }
}

export default Dashboard;
