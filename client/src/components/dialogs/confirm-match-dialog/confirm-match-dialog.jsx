import React from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogTitle, DialogHeader } from 'mineral-ui/Dialog';
import Text from 'mineral-ui/Text';

import Translate from '../../../locales/translate';

const ConfirmMatchDialog = (props) => {
  const { isOpen, closeDialog, restartApp } = props;
  return (
    <div>
      <Dialog
        actions={[
          { onClick: closeDialog, text: <Translate string="close-dialog" /> },
          { onClick: restartApp, text: <Translate string="restart-app" /> },
        ]}
        isOpen={isOpen}
        onClose={closeDialog}
      >
        <DialogHeader>
          <DialogTitle>
            <Translate string="confirm-match-dialog.title" />
          </DialogTitle>
        </DialogHeader>
        <Text>
          <Translate string="confirm-match-dialog.message" />
        </Text>
      </Dialog>
    </div>
  );
};

ConfirmMatchDialog.defaultProps = {
  closeDialog: () => {},
  restartApp: () => {},
  isOpen: false,
};

ConfirmMatchDialog.propTypes = {
  isOpen: PropTypes.bool,
  closeDialog: PropTypes.func,
  restartApp: PropTypes.func,
};

export default ConfirmMatchDialog;
