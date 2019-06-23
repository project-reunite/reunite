import React from 'react';
import axios from 'axios';

import Grid, { GridItem } from 'mineral-ui/Grid';
import appStatus from '../../utils/appStatus';
import genders from '../../utils/genders';
import ages from '../../utils/ages';

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
  Male: 'man-icon-blue.svg',
  Female: 'woman-icon-red.svg',
};

const gridStyle = { padding: '30px' };

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      appState: appStatus.WELCOME,
      gender: null,
      age: null,
      treeDetails: null,
    };
  }

  getGenderSelectionCards = () => {
    const genderList = Object.values(genders);
    const items = [];
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

  getMainPanel = () => {
    const { appState, treeDetails } = this.state;
    let content;
    switch (appState) {
      case appStatus.WELCOME:
        content = (
          <WelcomePanel
            startSearch={() => this.setState({ appState: appStatus.UPLOAD_PIC })}
          />
        );
        break;
      case appStatus.UPLOAD_PIC:
        content = (
          <UploadPicPanel
            UploadPicPanel={this.uploadPicture}
            moveOn={() => this.setState({ appState: appStatus.SELECT_GENDER })}
          />
        );
        break;
      case appStatus.SELECT_GENDER:
        content = this.getGenderSelectionCards();
        break;
      case appStatus.SELECT_AGES:
        content = this.getAgeSelectionCards();
        break;
      case appStatus.SUBMIT_CHOICES:
        this.submitChoices();
        break;
      case appStatus.PIC_COMPARISON:
        content = (
          <Deck
            startingDecisionID={treeDetails}
            onFailure={() => this.setState({ appState: appStatus.FAILURE })}
            onMatch={() => this.setState({ appState: appStatus.MATCH_FOUND })}
          />
        );
        break;
      case appStatus.FAILURE:
        content = <RestartPanel restart={() => this.setState({ appState: appStatus.WELCOME })} />;
        break;
      case appStatus.MATCH_FOUND:
        content = <MatchCard restart={() => this.setState({ appState: appStatus.WELCOME })} />;
        break;
      default:
        content = <Deck />;
        break;
    }
    return content;
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

  getAgeQueryString = () => {
    const { age } = this.state;
    if (age === ages.BABY) return 'minAge=0&maxAge=4';
    if (age === ages.CHILD) return 'minAge=5&maxAge=18';
    if (age === ages.ADULT) return 'minAge=19&maxAge=60';
    if (age === ages.ELDERLY) return 'minAge=61&maxAge=100';
    return '';
  }

  submitChoices = () => {
    const { gender } = this.state;
    const ageQuery = this.getAgeQueryString();
    axios.get(`http://localhost:9100/api/v1/trees?gender=${gender}&${ageQuery}`)
      .then(response => this.setState({
        treeDetails: response.data.docs[0].initialDecision_id,
        appState: appStatus.PIC_COMPARISON,
      }));
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
