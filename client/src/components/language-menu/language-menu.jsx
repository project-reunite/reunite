import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Menu, { MenuItem } from 'mineral-ui/Menu';
import useOutsideClick from '../../hooks/useOutsideClick';

const { languageMenuStyle } = require('../../styles/menu-styles');

const LanguageMenu = (props) => {
  const { submitLanguage, onClose } = props;
  const ref = useRef();

  const submit = (code) => {
    submitLanguage(code);
    onClose();
  };

  useOutsideClick(ref, () => {
    onClose();
  });

  return (
    <div ref={ref}>
      <Menu style={languageMenuStyle} className="languageMenu">
        <MenuItem onClick={() => submit('en')}>English</MenuItem>
        <MenuItem onClick={() => submit('fr')}>Français</MenuItem>
        <MenuItem>Espanol</MenuItem>
        <MenuItem>Deutsche</MenuItem>
      </Menu>
    </div>
  );
};

LanguageMenu.defaultProps = {
  onClose: () => {},
  submitLanguage: () => {},
};

LanguageMenu.propTypes = {
  onClose: PropTypes.func,
  submitLanguage: PropTypes.func,
};

export default LanguageMenu;
