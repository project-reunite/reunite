import React from 'react';
import PropTypes from 'prop-types';

import { PrimaryNav, NavItem } from 'mineral-ui/Navigation';
import IconRestart from 'mineral-ui-icons/IconArrowBack';
import IconExpandMore from 'mineral-ui-icons/IconExpandMore';

import Translate from '../../locales/translate';
import './header.scss';

const { headerStyle, navItemStyle } = require('../../styles/header-styles');

const Header = (props) => {
  const { goBack } = props;
  return (
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
      <NavItem style={navItemStyle} color="#61B7E1" icon={<IconExpandMore />}>
        <Translate string="header.language" />
      </NavItem>
    </PrimaryNav>
  );
};

Header.defaultProps = {
  goBack: () => {},
};

Header.propTypes = {
  goBack: PropTypes.func,
};

export default Header;
