import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'mineral-ui/Dialog';
import Text from 'mineral-ui/Text';

const ConfirmMatchDialog = (props) => {
  const { isOpen, closeDialog, restartApp } = props;
  return (
    <div>
      <Dialog
        title="Aid worker contacted"
        actions={[
          { onClick: closeDialog, text: 'Close' },
          { onClick: restartApp, text: 'Restart App' },
        ]}
        isOpen={isOpen}
        onClose={closeDialog}
      >
        <Text>
          An aid worker has been contacted and is verifying the match, you will be contacted with
          further information.
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
