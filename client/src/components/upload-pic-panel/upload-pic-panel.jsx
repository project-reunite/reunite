import React from 'react';
import './upload-pic-panel.scss';

import PropTypes from 'prop-types';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Card, { CardImage } from 'mineral-ui/Card';

const UploadPicPanel = (props) => {
  const { moveOn } = props;
  return (
    <div className="uploadPicPanel" data-cy="upload-pic-panel">
      <Flex
        wrap
        justifyContent="evenly"
        alignItems="center"
      >
        <FlexItem className="startButton" data-cy="picture-button">
          <Card onClick={moveOn}>
            <CardImage
              className="cardImage"
              src="photo.svg"
              alt="gradient placeholder"
            />
          </Card>
        </FlexItem>
        <FlexItem className="startButton" data-cy="no-picture-button">
          <Card onClick={moveOn}>
            <CardImage
              className="cardImage"
              src="no-photo.svg"
              alt="gradient placeholder"
            />
          </Card>
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
