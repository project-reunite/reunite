import React, { PureComponent } from 'react';
import LocaleContext from '../locale-context';

import en from './en.json';
import fr from './fr.json';
import hi from './hi.json';
import ar from './ar.json';

const {
  numMissingPeople,
  numPhotosViaExistingSolutions,
} = require('../config');

export default class Translate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      langs: {
        en: replacePlaceholdersWithNumbers(en),
        fr: replacePlaceholdersWithNumbers(fr),
        hi: replacePlaceholdersWithNumbers(hi),
        ar: replacePlaceholdersWithNumbers(ar),
      },
    };
  }

  render() {
    const { langs } = this.state;
    const { string } = this.props;
    return <LocaleContext.Consumer>{value => langs[value][string]}</LocaleContext.Consumer>;
  }
}

const replacePlaceholdersWithNumbers = (JSONObj) => {
  const replacements = {
    '%numMissingPeople%': numMissingPeople,
    '%numPhotosViaExistingSolutions%': numPhotosViaExistingSolutions,
  };
  const str = JSON.stringify(JSONObj);
  const strWithInsertedVars = str.replace(/%\w+%/g, all => replacements[all] || all);
  return JSON.parse(strWithInsertedVars);
}
