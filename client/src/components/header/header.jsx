import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { PrimaryNav, NavItem } from 'mineral-ui/Navigation';
import Dropdown from 'mineral-ui/Dropdown';
import OverflowContainer from 'mineral-ui/OverflowContainer';
import Button from 'mineral-ui/Button';
import IconRestart from 'mineral-ui-icons/IconArrowBack';
import IconExpandMore from 'mineral-ui-icons/IconExpandMore';
import Menu, { MenuDivider, MenuGroup, MenuItem } from 'mineral-ui/Menu';

import Translate from '../../locales/translate';
import './header.scss';

const { headerStyle, navItemStyle } = require('../../styles/header-styles');
const { languageMenuStyle } = require('../../styles/menu-styles');

const data = [
  {
    text: 'Menu item with onClick',
    onClick: (event) => {
      console.log(event);
    },
  },
];

const Header = (props) => {
  const [openLanguageMenu, setOpenLanguageMenu] = useState(false);
  const { goBack, submitLanguage } = props;

  const languageMenu = openLanguageMenu ? (
    <LanguageMenu submitLanguage={submitLanguage} onClose={() => setOpenLanguageMenu(false)} />
  ) : (
    <null />
  );

  return (
    <div>
      <PrimaryNav className="headerBar" style={headerStyle} align="justify">
        <NavItem
          className="back-button"
          onClick={goBack}
          style={navItemStyle}
          icon={<IconRestart />}
          data-cy="back-button"
        >
          <Translate string="header.back" />
        </NavItem>
        <NavItem
          style={navItemStyle}
          onClick={() => setOpenLanguageMenu(!openLanguageMenu)}
          color="#61B7E1"
          icon={<IconExpandMore />}
        >
          <Translate string="header.language" />
        </NavItem>
      </PrimaryNav>
      {languageMenu}
    </div>
  );
};

const LanguageMenu = (props) => {
  const { submitLanguage, onClose } = props;

  const submit = (code) => {
    submitLanguage(code);
    onClose();
  };

  return (
    <div>
      <Menu style={languageMenuStyle} className="languageMenu">
        <MenuItem onClick={() => submit('en')}>English</MenuItem>
        <MenuItem onClick={() => submit('fr')}>Français</MenuItem>
        <MenuItem>Espanol</MenuItem>
        <MenuItem>Deutsche</MenuItem>
      </Menu>
    </div>
  );
};

Header.defaultProps = {
  goBack: () => {},
};

Header.propTypes = {
  goBack: PropTypes.func,
};

export default Header;
