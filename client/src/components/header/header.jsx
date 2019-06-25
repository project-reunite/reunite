import React from 'react';
import { PrimaryNav, NavItem } from 'mineral-ui/Navigation';
import IconMenu from 'mineral-ui-icons/IconMenu';
import IconExpandMore from 'mineral-ui-icons/IconExpandMore';

import './header.scss';

const headerStyle = {
  backgroundColor: '#132832',
};

const navItemStyle = {
  color: '#61B7E1',
};

const Header = () => (
  <PrimaryNav
    style={headerStyle}
    align="justify"
  >
    <NavItem style={navItemStyle} color="#61B7E1" icon={<IconExpandMore />}>Language</NavItem>
    <NavItem style={navItemStyle} color="#61B7E1" icon={<IconMenu />}>Menu</NavItem>
  </PrimaryNav>

);

// <img className="logo" src="reunite-icon.svg" />
// <h2>
//   Reunite
// </h2>

export default Header;
