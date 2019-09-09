import React, { PureComponent } from 'react';
import LocaleContext from '../locale-context';

import en from './en.json';
import fr from './fr.json';

export default class Translate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      langs: {
        en,
        fr,
      },
    };
  }

  render() {
    const { langs } = this.state;
    const { string } = this.props;
    return <LocaleContext.Consumer>{value => langs[value][string]}</LocaleContext.Consumer>;
  }
}
