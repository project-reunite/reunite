import React from 'react';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import GeneralCard from '../general-card';

const { flexStyle } = require('../../styles/flex-styles');

const UploadPicPanel = (props) => {
  const { moveOn } = props;
  return (
    <div className="cardContainer" data-cy="upload-pic-card">
      <Flex
        wrap
        {...flexStyle}
      >
        <FlexItem className="startButton" data-cy="picture-button">
          <GeneralCard onClick title="Photo" img="photo.svg" />
        </FlexItem>
        <FlexItem className="startButton" data-cy="no-picture-button">
          <GeneralCard onClick={moveOn} title="No Photo" img="no-photo.svg" />
        </FlexItem>
      </Flex>
    </div>
  );
};

UploadPicPanel.defaultProps = {
  moveOn: () => console.log('moveOn prop not found'),
};

UploadPicPanel.propTypes = {
  moveOn: PropTypes.func,
};

export default UploadPicPanel;
