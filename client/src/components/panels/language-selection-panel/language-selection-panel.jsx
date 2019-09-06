import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardTitle, CardBlock } from 'mineral-ui/Card';
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
            onClick={() => submitLanguage('en')}
            className="languageCard"
            img="gb-eng.svg"
          >
            <span className="flag-icon flag-icon-gb-eng flag-icon-squared" />
            <img className="flagImage" src="gb-eng.svg" />
            <span />

            <CardBlock className="languageCardBlock">English</CardBlock>
            {/* <CardTitle className="languageCardTitle">English</CardTitle> */}
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
            <img className="flagImage" src="fr.svg" />
            <span />
            <CardBlock className="languageCardBlock">French</CardBlock>
            {/* <CardTitle className="languageCardTitle">Francais</CardTitle> */}
          </Card>
        </FlexItem>
        <FlexItem>
          <Card
            style={languageCardStyle}
            // onClick={() => submitLanguage('es')}
            className="languageCard"
          >
            <span className="flag-icon flag-icon-es flag-icon-squared" />
            <img className="flagImage" src="es.svg" />
            <span />
            <CardBlock className="languageCardBlock">Español</CardBlock>
            {/* <CardTitle className="languageCardTitle">Español</CardTitle> */}
          </Card>
        </FlexItem>
        <FlexItem>
          <Card
            style={languageCardStyle}
            // onClick={() => submitLanguage('de')}
            className="languageCard"
          >
            <span className="flag-icon flag-icon-de flag-icon-squared" />
            <img className="flagImage" src="de.svg" />
            <span />
            <CardBlock className="languageCardBlock">Deutsche</CardBlock>
            {/* <CardTitle className="languageCardTitle">Deutsche</CardTitle> */}
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
