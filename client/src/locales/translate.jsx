import React, { PureComponent } from 'react';
import LocaleContext from '../locale-context';

import en from './en.json';
import fr from './fr.json';
import hi from './hi.json';

export default class Translate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      langs: {
        en,
        fr,
        hi,
      },
    };
  }

  render() {
    const { langs } = this.state;
    const { string } = this.props;
    return <LocaleContext.Consumer>{value => langs[value][string]}</LocaleContext.Consumer>;
  }
}
