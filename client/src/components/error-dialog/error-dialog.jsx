import React from 'react';
import Dialog from 'mineral-ui/Dialog';
import Text from 'mineral-ui/Text';

const ErrorDialog = (props) => {
  const { onClick } = props;
  return (
    <Dialog
      variant="danger"
      title="ipsum dolor sit amet"
      actions={[
        { text: 'Cancel' },
        { text: 'Action' },
      ]}
    >
      <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </Dialog>
  );
};

export default ErrorDialog;
