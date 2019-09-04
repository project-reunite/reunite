import React from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogActions, DialogHeader, DialogTitle } from 'mineral-ui/Dialog';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';

const ErrorDialog = (props) => {
  const { error, restartApp, close } = props;
  return (
    <Dialog isOpen variant="danger" onClose={close}>
      <DialogHeader>
        <DialogTitle>Error</DialogTitle>
      </DialogHeader>
      <Text>{error}</Text>
      <DialogActions>
        <Button onClick={restartApp} size="medium">
          Restart App
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
