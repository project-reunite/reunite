import React from 'react';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import GeneralCard from '../general-card';

const UploadPicPanel = (props) => {
  const { moveOn } = props;
  return (
    <div className="cardContainer" data-cy="upload-pic-panel">
      <Flex
        wrap
        justifyContent="evenly"
        alignItems="center"
      >
        <FlexItem className="startButton" data-cy="picture-button">
          <GeneralCard onClick={moveOn} title="Photo" img="photo.svg" />
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
