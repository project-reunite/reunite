import React from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogTitle, DialogHeader } from 'mineral-ui/Dialog';
import Text from 'mineral-ui/Text';

import Translate from '../../../locales/translate';

const NoMatchDialog = (props) => {
  const { isOpen, restartApp } = props;
  return (
    <div>
      <Dialog
        actions={[{ onClick: restartApp, text: <Translate string="restart-app" /> }]}
        isOpen={isOpen}
      >
        <DialogHeader>
          <DialogTitle>No more choices</DialogTitle>
        </DialogHeader>
        <Text>
          <Translate string="no-match-dialog.message" />
        </Text>
      </Dialog>
    </div>
  );
};

NoMatchDialog.defaultProps = {
  restartApp: () => {},
  isOpen: false,
};

NoMatchDialog.propTypes = {
  isOpen: PropTypes.bool,
  restartApp: PropTypes.func,
};

export default NoMatchDialog;
