import React from 'react';
import PropTypes from 'prop-types';

import { PrimaryNav, NavItem } from 'mineral-ui/Navigation';
import IconRestart from 'mineral-ui-icons/IconArrowBack';
import IconExpandMore from 'mineral-ui-icons/IconExpandMore';

import './header.scss';

const { headerStyle, navItemStyle } = require('../../styles/header-styles');

const Header = (props) => {
  const { goBack } = props;
  return (
    <PrimaryNav
      PrimaryNavItem_backgroundColor_hover="green"
      PrimaryNavItem_backgroundColor_selected="green"
      className="headerBar"
      style={headerStyle}
      align="justify"
    >
      <NavItem
        className="back-button"
        backgroundColor_hover="green"
        backgroundColor_selected="green"
        onClick={goBack}
        style={navItemStyle}
        icon={<IconRestart />}
        data-cy="back-button"
      >
        Back
      </NavItem>
      <NavItem style={navItemStyle} color="#61B7E1" icon={<IconExpandMore />}>
        Language
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
