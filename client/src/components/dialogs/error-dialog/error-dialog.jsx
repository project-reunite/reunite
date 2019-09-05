import React from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogActions, DialogHeader, DialogTitle } from 'mineral-ui/Dialog';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';

import Translate from '../../../locales/translate';

const ErrorDialog = (props) => {
  const { restartApp, close } = props;
  return (
    <Dialog isOpen variant="danger" onClose={close}>
      <DialogHeader>
        <DialogTitle>
          <Translate string="error-dialog.title" />
        </DialogTitle>
      </DialogHeader>
      <Text>
        <Translate string="server-error" />
      </Text>
      <DialogActions>
        <Button onClick={restartApp} size="medium">
          <Translate string="restart-app" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ErrorDialog.defaultProps = {
  error: '',
  restartApp: () => {},
  close: () => {},
};

ErrorDialog.propTypes = {
  error: PropTypes.string,
  restartApp: PropTypes.func,
  close: PropTypes.func,
};

export default ErrorDialog;
