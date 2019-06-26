import React from 'react';

import Menu, { MenuItem } from 'mineral-ui/Menu';
import Card, { CardTitle } from 'mineral-ui/Card';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import FlagIcon from '../flag-icons';

const { languageCardStyle } = require('../../styles/card-styles');
const { languageMenuStyle } = require('../../styles/menu-styles');
const { flexStyle } = require('../../styles/flex-styles');

const LanguageSelectionCard = (props) => {
  const { submitLanguage } = props;
  return (
    <div className="cardContainer" data-cy="language-selection-panel">
      <Flex
        wrap
        {...flexStyle}
      >
        <FlexItem>
          <Card style={languageCardStyle} className="languageCard" data-cy="restart-card">
            <CardTitle className="cardTitle">Select Language</CardTitle>
            <Menu
              style={languageMenuStyle}
            >
              <MenuItem iconEnd={<FlagIcon code="gb-eng" />} data-cy="language-english" onClick={submitLanguage}>
            English
              </MenuItem>
              <MenuItem iconEnd={<FlagIcon code="fr" />} onClick={submitLanguage}>
            Français
              </MenuItem>
              <MenuItem iconEnd={<FlagIcon code="es" />} onClick={submitLanguage}>
            Espanol
              </MenuItem>
              <MenuItem iconEnd={<FlagIcon code="de" />} onClick={submitLanguage}>
            Alemand
              </MenuItem>
            </Menu>
          </Card>
        </FlexItem>
      </Flex>
    </div>
  );
};

export default LanguageSelectionCard;
