import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'mineral-ui/Dialog';
import Text from 'mineral-ui/Text';

const GeneralDialog = (props) => {
  const { isOpen, closeDialog } = props;
  return (
    <div>
      <Dialog
        title="Aid worker contacted"
        actions={[
          { onClick: closeDialog, text: 'Cancel' },
        ]}
        isOpen={isOpen}
        onClose={closeDialog}
      >
        <Text>
          An aid worker has been contacted and is verifying the match, you will be
          contacted with further information.
        </Text>
      </Dialog>
    </div>
  );
};

GeneralDialog.defaultProps = {
  closeDialog: () => {},
  isOpen: false,
};

GeneralDialog.propTypes = {
  isOpen: PropTypes.bool,
  closeDialog: PropTypes.func,
};

export default GeneralDialog;
