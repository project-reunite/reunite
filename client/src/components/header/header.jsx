import React from 'react';
import PropTypes from 'prop-types';

import { PrimaryNav, NavItem } from 'mineral-ui/Navigation';
import IconRestart from 'mineral-ui-icons/IconArrowBack';
import IconExpandMore from 'mineral-ui-icons/IconExpandMore';

import './header.scss';

const { headerStyle, navItemStyle } = require('../../styles/header-styles');

const Header = (props) => {
  const { restart } = props;
  return (
    <PrimaryNav
      style={headerStyle}
      align="justify"
    >
      <NavItem onClick={restart} style={navItemStyle} color="#61B7E1" icon={<IconRestart />}>Back</NavItem>
      <NavItem style={navItemStyle} color="#61B7E1" icon={<IconExpandMore />}>Language</NavItem>
    </PrimaryNav>
  );
};

Header.defaultProps = {
  restart: () => {},
};

Header.propTypes = {
  restart: PropTypes.func,
};

export default Header;
