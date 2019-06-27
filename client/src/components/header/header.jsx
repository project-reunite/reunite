import React from 'react';
import { PrimaryNav, NavItem } from 'mineral-ui/Navigation';

import IconRestart from 'mineral-ui-icons/IconRefresh';
import IconExpandMore from 'mineral-ui-icons/IconExpandMore';

import './header.scss';

const headerStyle = {
  backgroundColor: '#132832',
};

const navItemStyle = {
  // color: '#61B7E1',
  color: 'white',
};

const Header = (props) => {
  const { restart } = props;
  return (
    <PrimaryNav
      style={headerStyle}
      align="justify"
    >
      <NavItem onClick={restart} style={navItemStyle} color="#61B7E1" icon={<IconRestart />}>Restart</NavItem>
      <NavItem style={navItemStyle} color="#61B7E1" icon={<IconExpandMore />}>Language</NavItem>
    </PrimaryNav>
  );
};

export default Header;
