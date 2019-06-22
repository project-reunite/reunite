import React from 'react';
import axios from 'axios';

import Grid, { GridItem } from 'mineral-ui/Grid';
import appStatus from '../../utils/appStatus';
import genders from '../../utils/genders';
import ages from '../../utils/ages';

import SelectionCard from '../selection-card';
import WelcomePanel from '../welcome-panel'
import Deck from '../deck';
import Header from '../header';

const ageUrls = {
  BABY: 'baby.svg',
  CHILD: 'child.svg',
  ADULT: 'adult.svg',
  ELDERLY: 'elderly.svg',
};

const genderUrls = {
  MALE: 'adult.svg',
  FEMALE: 'woman-icon.svg',
};

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      appState: appStatus.WELCOME,
      gender: null,
      age: null,
    };
  }

  getGenderSelectionCards = () => {
    const genderList = Object.values(genders);
    const items = [];
    for (let i = 0; i < genderList.length; i += 1) {
      const props = {
        setSelection: this.setGender,
        selection:genderList[i],
        urls:genderUrls,
        cyTag:"gender-selection-card",
      }
      items.push(
        <GridItem>
          <SelectionCard {...props} />
        </GridItem>,
      );
    }
    return <Grid>{items}</Grid>;
  }

  getAgeSelectionCards = () => {
    const ageList = Object.values(ages);
    const items = [];
    for (let i = 0; i < ageList.length; i += 1) {
      const props = {
        setSelection: this.setAge,
        selection: ageList[i],
        urls: ageUrls,
        cyTag:"age-selection-card",
      }
      items.push(
        <GridItem>
          <SelectionCard {...props} />
        </GridItem>,
      );
    }
    return <Grid>{items}</Grid>;
  }

  // showMoreInfo = () => {
  // }

  getMainPanel = () => {
    const { appState } = this.state;
    let content;
    switch (appState) {
      case appStatus.WELCOME:
        content = <WelcomePanel startSearch={this.startSearch} />
        break;
      case appStatus.SELECT_GENDER:
        content = this.getGenderSelectionCards();
        break;
      case appStatus.SELECT_AGES:
        content = this.getAgeSelectionCards();
        break;
      case appStatus.PIC_COMPARISON:
        // this.submitChoices();
        content = <Deck />;
        break;
      default:
        content = <Deck />;
        break;
    }
    return content;
  }

  startSearch = () => {
    this.setState({
      appState: appStatus.SELECT_GENDER,
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
      appState: appStatus.PIC_COMPARISON,
    });
  }

  getAgeQueryString = () => {
    const { age } = this.state;
    if (age === ages.BABY) return 'age>=0&age<=4';
    if (age === ages.CHILD) return 'age>=5&age<=18';
    if (age === ages.ADULT) return 'age>=19&age<=59';
    if (age === ages.ELDERLY) return 'age>=60';
    return '';
  }

  // TODO: get tree from backend
  submitChoices = () => {
    const { gender } = this.state;
    const ageQuery = this.getAgeQueryString();
    axios.get(`http://localhost:9100/api/v1/persons/trees/?gender=${gender}&${ageQuery}`)
      .then(response => this.setState({startingDecisionID: response.trees.decisionId}));
  }

  render() {
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
