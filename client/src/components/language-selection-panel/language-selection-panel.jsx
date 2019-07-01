import React from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItem } from 'mineral-ui/Menu';
import Card, { CardTitle } from 'mineral-ui/Card';
import Flex, { FlexItem } from 'mineral-ui/Flex';

const { languageCardStyle } = require('../../styles/card-styles');
const { languageMenuStyle } = require('../../styles/menu-styles');
const { flexStyle } = require('../../styles/flex-styles');

const LanguageSelectionPanel = (props) => {
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
              <MenuItem data-cy="language-english" onClick={submitLanguage}>
            English
              </MenuItem>
              <MenuItem onClick={submitLanguage}>
            Français
              </MenuItem>
              <MenuItem onClick={submitLanguage}>
            Espanol
              </MenuItem>
              <MenuItem onClick={submitLanguage}>
            Alemand
              </MenuItem>
              <MenuItem onClick={submitLanguage}>
              عرب
              </MenuItem>
              <MenuItem onClick={submitLanguage}>
              中文
              </MenuItem>
            </Menu>
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
