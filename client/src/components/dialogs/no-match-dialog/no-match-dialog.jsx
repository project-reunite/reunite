import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'mineral-ui/Dialog';
import Text from 'mineral-ui/Text';

const NoMatchDialog = (props) => {
  const { isOpen, closeDialog, restartApp } = props;
  return (
    <div>
      <Dialog
        title="No more choices"
        actions={[
          { onClick: closeDialog, text: 'Close' },
          { onClick: restartApp, text: 'Restart App' },

        ]}
        isOpen={isOpen}
        onClose={closeDialog}
      >
        <Text>
           No match was found, your choices will be stored and you
           will be contacted if a potential match is added to the
           system.
        </Text>
      </Dialog>
    </div>
  );
};

NoMatchDialog.defaultProps = {
  closeDialog: () => {},
  isOpen: false,
};

NoMatchDialog.propTypes = {
  isOpen: PropTypes.bool,
  closeDialog: PropTypes.func,
};

export default NoMatchDialog;
