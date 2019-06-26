import React from 'react';

import './dashboard.scss';

import Flex, { FlexItem } from 'mineral-ui/Flex';
import appStatus from '../../utils/appStatus';
import genders from '../../utils/genders';
import ages from '../../utils/ages';
import apiRequests from '../../utils/apiRequests';

import GeneralCard from '../general-card';
import UploadPicPanel from '../upload-pic-card';
import WelcomeCard from '../welcome-card';
import RestartCard from '../restart-card';
import MatchCard from '../match-card';
import Deck from '../deck';
import Header from '../header';

const { flexStyle } = require('../../styles/flex-styles');

const ageUrls = {
  Baby: 'baby.svg',
  Child: 'child.svg',
  Adult: 'man-icon.svg',
  Elderly: 'elderly.svg',
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
      personId: null,
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
    for (let i = 0; i < genderList.length; i += 1) {
      const selection = genderList[i];
      const props = {
        onClick: () => this.setGender(selection),
        title: selection,
        img: genderUrls[selection],
        dataCy: `gender-selection-card-${selection}`,
      };
      items.push(
        <FlexItem>
          <GeneralCard {...props} />
        </FlexItem>,
      );
    }
    return (
      <div className="selectionPanel">
        <Flex
          wrap
          {...flexStyle}
        >
          {items}
        </Flex>
      </div>
    );
  }

  getAgeSelectionCards = () => {
    const ageList = Object.values(ages);
    const items = [];
    for (let i = 0; i < ageList.length; i += 1) {
      const selection = ageList[i];
      const props = {
        onClick: () => this.setAge(selection),
        title: selection,
        img: ageUrls[selection],
        dataCy: `age-selection-card-${selection}`,
        imageClassName: 'ageSelectCardImage',
      };
      items.push(
        <FlexItem>
          <GeneralCard {...props} />
        </FlexItem>,
      );
    }
    return (
      <div className="selectionPanel">
        <Flex
          wrap
          {...flexStyle}
        >
          {items}
        </Flex>
      </div>
    );
  }

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

  getDeck = () => {
    const { initialDecisionId } = this.state;
    // const initialDecisionId = '63e667f6d8cc11d219851bce64f8da2d';
    return (
      <Deck
        startingDecisionID={initialDecisionId}
        onFailure={() => this.setState({ appState: appStatus.FAILURE })}
        onMatch={id => this.setState({
          personId: id,
          appState: appStatus.MATCH_FOUND,
        })}
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
        />
      </Flex>
    );
  }

  getMainPanel = () => {
    const { appState } = this.state;
    let content;
    switch (appState) {
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
      // ComponentDidMount makes async call to submit choices
        break;
      case appStatus.PIC_COMPARISON:
        content = this.getDeck();
        break;
      case appStatus.FAILURE:
        content = this.getRestartCard();
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
