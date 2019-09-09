import React from 'react';
import PropTypes from 'prop-types';

import './language-selection-panel.scss';
import Card, { CardBlock } from 'mineral-ui/Card';
import Flex, { FlexItem } from 'mineral-ui/Flex';

import Translate from '../../../locales/translate';

const { languageCardStyle } = require('../../../styles/card-styles');
const { flexStyle } = require('../../../styles/flex-styles');

const LanguageSelectionPanel = (props) => {
  const { submitLanguage } = props;
  return (
    <div className="cardContainer" data-cy="language-selection-panel">
      <h1>
        <Translate string="language-select.translate" />
      </h1>
      <Flex wrap {...flexStyle}>
        <FlexItem>
          <Card
            style={languageCardStyle}
            data-cy="language-english"
            onClick={() => submitLanguage('en')}
            className="languageCard"
            img="gb-eng.svg"
          >
            <span className="flag-icon flag-icon-gb-eng flag-icon-squared" />
            <img className="flagImage" alt="" src="gb-eng.svg" />
            <span />

            <CardBlock className="languageCardBlock">English</CardBlock>
          </Card>
        </FlexItem>
        <FlexItem>
          <Card
            style={languageCardStyle}
            onClick={() => submitLanguage('fr')}
            className="languageCard"
            data-cy="restart-card"
          >
            <span className="flag-icon flag-icon-fr flag-icon-squared" />
            <img className="flagImage" alt="" src="fr.svg" />
            <span />
            <CardBlock className="languageCardBlock">Français</CardBlock>
          </Card>
        </FlexItem>
        <FlexItem>
          <Card
            style={languageCardStyle}
            // onClick={() => submitLanguage('es')}
            className="languageCard"
          >
            <span className="flag-icon flag-icon-in flag-icon-squared" />
            <img className="flagImage" alt="" src="in.svg" />
            <span />
            <CardBlock className="languageCardBlock">हिंदी</CardBlock>
          </Card>
        </FlexItem>
        <FlexItem>
          <Card
            style={languageCardStyle}
            // onClick={() => submitLanguage('de')}
            className="languageCard"
          >
            <span className="flag-icon flag-icon-de flag-icon-squared" />
            <img className="arabicImage" alt="" src="arabic.svg" />
            <span />
            <CardBlock className="arabicLanguageCardBlock">عربى</CardBlock>
          </Card>
        </FlexItem>
      </Flex>
    </div>
  );
};

LanguageSelectionPanel.defaultProps = {
  submitLanguage: () => {},
};

LanguageSelectionPanel.propTypes = {
  submitLanguage: PropTypes.func,
};

export default LanguageSelectionPanel;
