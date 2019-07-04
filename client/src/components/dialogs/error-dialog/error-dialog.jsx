import React from 'react';
import PropTypes from 'prop-types';

import Dialog, {
  DialogActions, DialogHeader, DialogTitle,
} from 'mineral-ui/Dialog';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';


const ErrorDialog = (props) => {
  const {
    error, restart, close,
  } = props;
  return (
    <Dialog
      isOpen
      variant="danger"
      onClose={close}
    >
      <DialogHeader>
        <DialogTitle>Error</DialogTitle>
      </DialogHeader>
      <Text>
        {error}
      </Text>
      <DialogActions>
        <Button onClick={restart} size="medium">Restart App</Button>
      </DialogActions>
    </Dialog>
  );
};

ErrorDialog.defaultProps = {
  error: '',
  restart: () => {},
  close: () => {},
};

ErrorDialog.propTypes = {
  error: PropTypes.string,
  restart: PropTypes.func,
  close: PropTypes.func,
};

export default ErrorDialog;
