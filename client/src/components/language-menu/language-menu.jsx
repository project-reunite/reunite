import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import './language-menu.scss';
import Menu, { MenuItem } from 'mineral-ui/Menu';
import GbEngIcon from '../icons/gb-icon';

import EsIcon from '../icons/es-icon';
import FrIcon from '../icons/fr-icon';
import DeIcon from '../icons/de-icon';

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
        <MenuItem iconStart={<GbEngIcon />} onClick={() => submit('en')}>
          English
        </MenuItem>
        <MenuItem iconStart={<FrIcon />} onClick={() => submit('fr')}>
          Français
        </MenuItem>
        <MenuItem iconStart={<EsIcon />}>Espanol</MenuItem>
        <MenuItem iconStart={<DeIcon />}>Deutsche</MenuItem>
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
